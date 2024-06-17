import { render } from "@testing-library/react";
import user from "@testing-library/user-events";
import Counter from "./CounterTwo";

describe("Test Counter", () => {

    test("test Renders", () => {
        render(<Counter count={0} />);
        const textElement = screen.getByText("Counter Two");
        expect(textElement).toBeInTheDocument();
    });

    // Test handlers
    test('handlers are called', async () => {
        const incrementMockFun = jest.fn();
        const decrementMockFun = jest.fn();

        render(<Counter count={0}
            handlerIncrement={incrementMockFun}
            handlerDecrement={decrementMockFun}
        />);

        const incrementButton = screen.getByRole('button', { name: 'Increment' });
        const decrementButton = screen.getByRole('button', { name: 'Decrement' });

        await user.click(incrementButton);
        await user.click(decrementButton);

        expect(incrementMockFun).toHaveBeenCalledTimes(1);
        expect(decrementMockFun).toHaveBeenCalledTimes(1);
    });

    // Test Api Call
})