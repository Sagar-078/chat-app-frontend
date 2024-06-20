import React from 'react'

const Modal = ({modalData}) => {

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm w-[100vw] h-[100vh]">
      <div className="w-11/12 max-w-[350px] rounded-lg border-[2px] border-gray-400 bg-zinc-700 p-6">
        <p className="text-2xl font-semibold text-white">{modalData.text1}</p>
        <p className="mt-3 mb-5 leading-6 text-zinc-400">{modalData.text2}</p>
        <div className="flex items-center gap-x-6">

          <button onClick={modalData?.btn1Handler} className="button-85"
          >{modalData?.btn1Text}</button>

          <button onClick={modalData?.btn2Handler}
            className="button-85"
          >{modalData?.btn2Text}</button>

        </div>
      </div>
    </div>
  )
}

export default Modal