import React from 'react'
import Features from '../features/features/Features'
import Banner from '../features/hero/Hero'
import featuresData from '../datas/features'

const Home = () => {
  return (
    <main>
        <Banner />
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map((feature, index) => {
                return (
                    <Features
                        key={index}
                        src={feature.src}
                        title={feature.title}
                        description={feature.description}
                    />
                )
            })}
        </section>
    </main>
  )
}

export default Home
