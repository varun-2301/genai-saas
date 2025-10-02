import "@testing-library/jest-dom"
import { vi } from "vitest"

vi.mock("firebase/app", () => ({
    initializeApp: vi.fn(),
}))

vi.mock("firebase/auth", () => ({
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    onAuthStateChanged: vi.fn().mockImplementation((auth, callback) => {
        // call callback with null (user not logged in) for tests
        callback(null)
        // return a function to unsubscribe
        return () => {}
    }),
    GoogleAuthProvider: vi.fn(),  // ✅ Add this
    signInWithPopup: vi.fn(),  
}))
