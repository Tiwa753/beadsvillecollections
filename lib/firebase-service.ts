import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from './firebase'

export interface FirebaseProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  images: string[]
  currency: string
}

// Real-time listener for products
export function subscribeToProducts(callback: (products: FirebaseProduct[]) => void) {
  const q = query(collection(db, 'products'), orderBy('name'))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProduct[]
    callback(products)
  })
  return unsubscribe
}

// Get all products once
export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, 'products'))
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as FirebaseProduct[]
}

// Add product
export async function addProduct(product: Omit<FirebaseProduct, 'id'>) {
  const docRef = await addDoc(collection(db, 'products'), product)
  return docRef.id
}

// Update product
export async function updateProduct(id: string, updates: Partial<FirebaseProduct>) {
  await updateDoc(doc(db, 'products', id), updates)
}

// Delete product
export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, 'products', id))
}

// Save orders
export async function saveOrder(orderData: any) {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...orderData,
    createdAt: new Date()
  })
  return docRef.id
}
