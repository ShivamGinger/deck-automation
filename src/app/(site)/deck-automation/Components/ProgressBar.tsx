import React from 'react';

const ProgressBar = ({ currentStep, totalSteps, steps }: { currentStep: number, totalSteps: number, steps: string[] }) => {
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <>
      <div className="mt-4 mb-8 w-full hidden md:block">
        <div className={`h-8 overflow-hidden w-full relative flex items-center`}>
          <div className={`h-1 bg-red-500 rounded-full absolute z-10`} style={{ width: `${progress}%` }}></div>
          <div className={`h-1 bg-gray-300 rounded-full w-full absolute `} ></div>
        </div>
        <div className='flex'>
          {steps.map((info, index) => (
            <div key={index}>
              <div
                style={{ transform: index === 0 ? 'translateX(-50%) translateY(-190%)' : index === 1 ? "translateX(480%) translateY(-190%)" : index === 2 ? "translateX(920%) translateY(-190%)" : index === 3 ? "translateX(2000%) translateY(-190%)" : "none" }}
                className={`${index <= currentStep ? "bg-red-500 " : "bg-gray-300 "} h-3 w-3 absolute rounded-full `}
              ></div>
              <p
                className={`${index === currentStep ? "font-bold" : ""}`}
                style={{ transform: index === 0 ? 'translateX(-50%)' : index === 1 ? "translateX(-10%)" : index === 2 ? "translateX(90%)" : index === 3 ? "translateX(450%)" : "none" }}
                key={index}
              >
                {info}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8 w-full md:hidden">
        <div className='flex flex-col'>
          {steps.map((info, index) => (
            <div key={index}>
              <div style={{ transform: "translateY(50%)" }}
                className={`${index <= currentStep ? "bg-red-500 " : "bg-gray-300 "} h-3 w-3 absolute rounded-full `}>
              </div>
              <p
                className={`${index === currentStep ? "font-bold" : ""} ml-8`}
                key={index}
              >
                {info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProgressBar