import { rest } from "msw";
import { setupServer } from "msw/node";
import { useFetchedData } from "./myHook";
import { render, screen, waitFor } from "@testing-library/react";

// Declare which API requests to mock
const server = setupServer(
    rest.get("http://stream", (req, res, ctx) => {
      const data = new Uint8Array([1,2,3,4]);
      return res(
        ctx.set('Content-Length', data.byteLength.toString()),
        ctx.set('Content-Type', 'application/octet-stream'),
        // Respond with the "ArrayBuffer".
        ctx.body(data)
      );
    })
);

test("it should fetch binary data", async () => {
  
    function TestComponent() {
        const data = useFetchedData('http://stream');
        return <div role="data">{data.length}</div>;
    }
    render(<TestComponent />);

    const d = screen.getByRole("data");

    await waitFor(() => expect(d).toHaveTextContent('4'));
})