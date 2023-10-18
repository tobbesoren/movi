import { useEffect, useRef } from "react"
import '../styles/dialog.css';

const isClickInsideRectangle = (e, element) => {
  const r = element.getBoundingClientRect()

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  )
}

export const ActionAlertDialog = ({ title,lblRed,lblBlue,leftAction, isOpened, onAction, onClose, children }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal()
      document.body.classList.add("modal-open")
    } else {
      ref.current?.close()
      document.body.classList.remove("modal-open")
    }
  }, [isOpened])

  const handleAction = () => {
    onAction()
    onClose()
  }

  return (
    <dialog className="container-dialog"
      ref={ref}
      onCancel={onClose}
      onClick={e =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
      <h3>{title}</h3>
      <div className="container-children">
        {children}
      </div>

      {leftAction ? 
            <div className="container-buttons">
                <button className="button-red" onClick={handleAction}>{lblRed}</button>
                <button className="button-blue" onClick={onClose}>{lblBlue}</button>
            </div> : 
            <div className="container-buttons">
                <button className="button-red" onClick={onClose}>{lblRed}</button>
                <button className="button-blue" onClick={handleAction}>{lblBlue}</button>
            </div>
        }
   </dialog>
  )
}

export const AlertDialog = ({ title,lblButton,isOpened, onClose }) => {
    const ref = useRef(null)
  
    useEffect(() => {
      if (isOpened) {
        ref.current?.showModal()
        document.body.classList.add("modal-open")
      } else {
        ref.current?.close()
        document.body.classList.remove("modal-open")
      }
    }, [isOpened])
  
    return (
      <dialog className="container-dialog"
        ref={ref}
        onCancel={onClose}
        onClick={e =>
          ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
        }
      >
        <h3>{title}</h3>
        <div className="container-button-alert">
            <div className="container-buttons">
            <button className="button-blue" onClick={onClose}>{lblButton}</button>
            </div>
        </div>
      </dialog>
    )
  }
