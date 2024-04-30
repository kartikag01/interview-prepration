function useOnClickOutside(ref, handler) {
    React.useEffect(() => {
        function listener(event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        }

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    }, []);
}

export default function UseOnclickOutsideTest() {
    const [showContent, setShowContent] = useState(false);
    const ref = useRef();
    useOutsideClick(ref, () => setShowContent(false));

    return (
        <div>
            {showContent ? (
                <div ref={ref}>
                    <h1>This is a random content</h1>
                    <p>
                        Please click outside of this to close this. It won't close if you
                        click inside of this content
                    </p>
                </div>
            ) : (
                <button onClick={() => setShowContent(true)}>Show Content</button>
            )}
        </div>
    );
}