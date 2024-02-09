function App() {


    function handleSumit(event) {
        event.preventDefault();

        const formData = new FormData(e.target);
        const { email, password } = Object.entries(formData.entries());

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
            if(res.ok) {
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