import "./GetStarted.css"
import Button from "@mui/material/Button";

export default function GetStarted() {

    return (
        <section className="get-started">
            <article className="get-started-container">
                <h1 className="get-started-h1">Ready to get started?</h1>
                <h2 className="get-started-h2">Sign up or contact us</h2>
            </article>

            <article className="container-button">
                <Button variant="contained">Sign Up</Button>
                <Button variant="outlined">Contact Us</Button>
            </article>
        </section>
    )
}