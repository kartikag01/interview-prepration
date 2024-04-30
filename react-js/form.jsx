function App() {


    function handleSumit(event) {
        event.preventDefault();

        let formData = new FormData(e.target);
        let dataObject = Object.fromEntries(formData)

        const formData = new FormData(e.target);
        // NOTE
        // formData.get("email");
        console.log(formData.get('username'))
        console.log(formData.get('password'))

        const allFormData = Object.fromEntries(formData);

        fetch("/api/sign-in", {
            method: "POST",
            body: JSON.stringify({
                email, password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log("Signed in");
                    e.currentTarget.reset();
                } else {
                    console.error("Failed to sign in")
                }
            });
    }


    return (
        <div>
            <form onSubmit={handleSumit}>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="email">Password</label>
                <input type="password" id="password" name="password" />

                <button type="submit" >Sign In</button>
            </form>
        </div>
    )
}