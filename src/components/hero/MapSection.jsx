import React from 'react'

const MapSection = () => {
    return (
        <div className='w-full h-[800px]'>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d1109.24000008131!2d21.169007736483035!3d42.63061452205172!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d42.63127752529489!2d21.168868980951352!5e1!3m2!1sen!2sus!4v1738762325520!5m2!1sen!2sus" 
                width="100%" 
                height="800 " 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    )
}

export default MapSection