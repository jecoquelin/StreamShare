import "../HomeStyle.css"
import "./FeatureComponent.css"
import HomeCard from "./card/HomeCard";
import * as React from 'react';

export default function FeatureComponent() {

    const features: string[] = [ "Feature 1", "Feature 2", "Feature 3", "Feature 4" ]

    return (
        <section className="container feature">
            <h2 className="title">Feature</h2>
            <p className="subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
                mauris vel nunc laoreet tristique. Nullam ac nunc quis nunc
                ultricies tristique. Nullam ac nunc quis nunc ultricies
                tristique.
            </p>
            <div className="feature-container">
                {features.map((feature, i) => (
                    <React.Fragment key={i}>
                        <HomeCard title={feature} content={feature} />
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}