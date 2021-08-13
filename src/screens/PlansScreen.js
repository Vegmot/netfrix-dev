import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { db } from '../firebase'
import { loadStripe } from '@stripe/stripe-js'

import './PlansScreen.css'

const PlansScreen = () => {
  const thousand = 1000
  const [products, setProducts] = useState([])
  const [sessionLoading, setSessionLoading] = useState(false)
  const user = useSelector(selectUser) // logged in user
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then(snapshot => {
        snapshot.forEach(async doc => {
          setSubscription({
            role: doc.data().role,
            current_period_end: doc.data().current_period_end.seconds,
            current_period_start: doc.data().current_period_start.seconds,
          })
        })
      })
  }, [user.uid])

  useEffect(() => {
    db.collection('products')
      .where('active', '==', true)
      .get()
      .then(snapshot => {
        const products = {}
        snapshot.forEach(async doc => {
          products[doc.id] = doc.data()
          const priceSnapshot = await doc.ref.collection('prices').get()
          priceSnapshot.docs.forEach(priceDoc => {
            products[doc.id].prices = {
              priceId: priceDoc.id,
              priceData: priceDoc.data(),
            }
          })
        })
        setProducts(products)
      })
  }, [])

  const loadCheckout = async priceId => {
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })

    docRef.onSnapshot(async snapshot => {
      const { error, sessionId } = snapshot.data()

      if (error) {
        alert(`An error occured: ${error.message}`)
      }

      if (sessionId) {
        setSessionLoading(true)
        const testKey = process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY // needs to directly pass in string value to make it work
        const stripe = await loadStripe(testKey)

        stripe.redirectToCheckout({ sessionId })

        /*
        on checkout page:
        just put 4242424242424242... everywhere
        */
      }
    })

    setSessionLoading(false)
  }

  return (
    <div className='plans-screen'>
      {subscription && (
        <p>
          Renewal date:{' '}
          {new Date(
            subscription?.current_period_end * thousand
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role)

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && 'plans-screen-plan-disabled'
            } plans-screen-plan`}
          >
            <div className='plans-screen-info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              disabled={isCurrentPackage || sessionLoading}
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default PlansScreen
