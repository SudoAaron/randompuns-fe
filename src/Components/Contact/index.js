import React from 'react';

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            "name": e.target.name.value,
            "email": e.target.email.value,
            "message": e.target.message.value
        }
        console.log(message);
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="email" placeholder="Email" />
                <textarea name="message" placeholder="Message..">
                </textarea>
                <button>Send Message</button>
            </form>
        </div>
    )
}

export default Contact;