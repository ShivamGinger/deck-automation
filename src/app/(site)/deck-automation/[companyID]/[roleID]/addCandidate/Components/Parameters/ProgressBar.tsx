import React from 'react';

const ProgressBar = ({ currentStep, totalSteps, steps }: { currentStep: number, totalSteps: number, steps: string[] }) => {
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <>
      <div className="mt-4 mb-8 w-full hidden md:block">
        {steps.map((info, index) => (
          <div key={index} className='flex justify-center'>
            <p
              className={`${index === currentStep ? "font-bold uppercase py-4 " : "hidden"} `}
              key={index}
            >
              {info}
            </p>
          </div>
        ))}
        <div className={`h-8 overflow-hidden w-full relative flex items-center`}>
          <div className={`h-1 bg-[#542C06] rounded-full absolute z-10`} style={{ width: `${progress}%` }}></div>
          <div className={`h-1 bg-[#B1A59A] rounded-full w-full absolute `} ></div>
        </div>
        <div className='flex justify-between'>
          {steps.map((info, index) => (
            <div key={index}>
              <div
                style={{ transform: 'translateY(-190%)' }}
                className={`${index <= currentStep ? "bg-[#542C06] " : "bg-[#B1A59A] "} h-3 w-3 absolute rounded-full `}
              >
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8 w-full md:hidden pt-4 border-t border-black">
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