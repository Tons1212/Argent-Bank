import React from 'react'

function Features(props) {
    const { src, title, description } = props
  return (
    <div class="feature-item">
          <img src={src} alt="Chat Icon" class="feature-icon" />
          <h3 class="feature-item-title">{title}</h3>
          <p>
            {description}
          </p>
    </div>
  )
}

export default Features


