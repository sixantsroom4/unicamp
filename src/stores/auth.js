import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
  deleteUser,
  sendSignInLinkToEmail,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import { auth } from '../firebase'
import { doc, setDoc, getDocs, query, collection, where, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const loading = ref(true)
  const isDemoMode = ref(false)
  const profile = ref(null)
  const currentUser = ref(null)

  setPersistence(auth, browserLocalPersistence)

  onAuthStateChanged(auth, async (firebaseUser) => {
    loading.value = true
    try {
      if (firebaseUser) {
        currentUser.value = firebaseUser
        isAuthenticated.value = true
        user.value = firebaseUser
        const userData = await loadUserProfile()
        if (userData) {
          profile.value = userData
        }
      } else {
        currentUser.value = null
        isAuthenticated.value = false
        user.value = null
        profile.value = null
      }
    } catch (error) {
      console.error('Auth state change error:', error)
    } finally {
      loading.value = false
    }
  })

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      isAuthenticated.value = true
      user.value = userCredential.user
      return userCredential.user
    } catch (error) {
      console.error('로그인 실패:', error)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      isAuthenticated.value = true
      user.value = result.user
      return result.user
    } catch (error) {
      console.error('Google 로그인 실패:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      isAuthenticated.value = false
      user.value = null
    } catch (error) {
      console.error('로그아웃 실패:', error)
      throw error
    }
  }

  const startDemo = () => {
    isDemoMode.value = true
  }

  const registerUser = async (userData) => {
    try {
      // 닉네임 중복 확인
      const isDuplicate = await checkNicknameDuplicate(userData.nickname)
      if (isDuplicate) {
        throw new Error('이미 사용 중인 닉네임입니다.')
      }

      // Firebase Authentication에 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      )

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userData.email,
        name: userData.name,
        nickname: userData.nickname,
        birthDate: userData.birthDate,
        graduationYear: userData.graduationYear,
        gender: userData.gender,
        phone: userData.phone,
        school: userData.school,
        faculty: userData.faculty,
        department: userData.department,
        createdAt: new Date()
      })

      // 사용자 상태 업데이트
      await updateProfile(userCredential.user, {
        displayName: userData.nickname
      })

      return userCredential.user
    } catch (error) {
      console.error('회원가입 실패:', error)
      throw error
    }
  }

  const sendVerificationEmail = async (email) => {
    try {
      // 이메일 중복 체크
      const users = await getDocs(query(
        collection(db, 'users'), 
        where('email', '==', email)
      ))
      
      if (!users.empty) {
        throw new Error('이미 등록된 이메일입니다.')
      }

      // 6자리 인증 코드 생성
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Firestore에 인증 코드 저장
      await setDoc(doc(db, 'emailVerifications', email), {
        code: verificationCode,
        createdAt: new Date(),
        verified: false
      })

      // TODO: 실제 이메일 전송 로직 구현
      console.log('인증 코드:', verificationCode) // 개발용 콘솔 출력
      
      return true
    } catch (error) {
      console.error('이메일 인증 일 전송 실패:', error)
      throw error
    }
  }

  const checkEmailVerification = async () => {
    try {
      if (auth.currentUser) {
        await auth.currentUser.reload()
        return auth.currentUser.emailVerified
      }
      return false
    } catch (error) {
      console.error('이메일 인증 상태 확인 실패:', error)
      throw error
    }
  }

  const verifyEmailCode = async (email, code) => {
    try {
      const verificationDoc = await getDoc(doc(db, 'emailVerifications', email))
      
      if (!verificationDoc.exists()) {
        throw new Error('인증 정보를 찾을 수 없습니다.')
      }

      const verification = verificationDoc.data()
      
      // 3분 제한 확인
      const expirationTime = verification.createdAt.toDate().getTime() + (3 * 60 * 1000)
      if (Date.now() > expirationTime) {
        throw new Error('인증 시간이 만료되었습니다.')
      }

      if (verification.code !== code) {
        throw new Error('잘못된 인증 코드입니다.')
      }

      // 인증 성공 처리
      await updateDoc(doc(db, 'emailVerifications', email), {
        verified: true
      })

      return true
    } catch (error) {
      console.error('이메일 인증 코드 확인 실패:', error)
      throw error
    }
  }

  const checkNicknameDuplicate = async (nickname) => {
    try {
      const users = await getDocs(query(
        collection(db, 'users'),
        where('nickname', '==', nickname)
      ))
      return !users.empty
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error)
      throw error
    }
  }

  const loadUserProfile = async () => {
    try {
      const user = auth.currentUser
      if (!user) throw new Error('로그인이 필요합니다')

      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        profile.value = {
          ...userData,
          id: user.uid
        }
        return userData
      }
      throw new Error('프로필을 찾을 수 없습니다')
    } catch (error) {
      console.error('프로필 로드 실패:', error)
      throw error
    }
  }

  const updateUserProfile = async (profileData) => {
    try {
      const user = auth.currentUser
      if (!user) throw new Error('로그인이 필요합니다')

      // 기존 프로필 데이터와 병합
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const existingData = userDoc.exists() ? userDoc.data() : {}

      await updateDoc(doc(db, 'users', user.uid), {
        ...existingData,
        ...profileData,
        updatedAt: serverTimestamp()
      })

      // 로컬 상태 업데이트
      profile.value = {
        ...profile.value,
        ...profileData
      }

      return profile.value
    } catch (error) {
      console.error('프로필 업데이트 실패:', error)
      throw error
    }
  }

  return {
    isAuthenticated,
    user,
    loading,
    isDemoMode,
    startDemo,
    loginWithEmail,
    loginWithGoogle,
    logout,
    registerUser,
    sendVerificationEmail,
    checkEmailVerification,
    verifyEmailCode,
    checkNicknameDuplicate,
    loadUserProfile,
    updateUserProfile,
    currentUser
  }
})