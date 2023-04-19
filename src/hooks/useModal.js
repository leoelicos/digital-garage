import { useState } from 'react'

const useModal = () => {
  const [modal, setModal] = useState(false)

  const hideModal = () => {
    setModal(false)
  }

  const showModal = () => {
    setModal(true)
  }

  return { modal, showModal, hideModal }
}
export default useModal
