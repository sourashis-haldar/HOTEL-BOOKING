import React from 'react'

function Title({title,subTitle,align,font}) {
  return (
      <div className={`flex flex-col justify-center items-center ${align=='left'&& "md:items-start md:text-left"}`}>
          <h2 className={`text-4xl md:text-[40px] ${font || 'font-playfair'}`}>{title}</h2>
          <p className={`text-sm md:text-base text-gray-500/90 mt-2 max-w-174 ${align !=="left" && "text-center"} `}>{ subTitle}</p>
    </div>
  )
}

export default Title;