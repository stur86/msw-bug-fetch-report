import { useState } from "react";

export function useFetchedData(url: String): Uint8Array {
    const [data, setData] = useState(new Uint8Array());
    fetch(url as RequestInfo).then(async (resp: Response) => {
        console.log(resp);
        const stream = resp.body;
        if (stream) {
          const reader = stream.getReader();
          const res = await reader.read();
          if (res.value) {
              setData(res.value);
          }
        }
    });

    return data;
}