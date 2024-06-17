### React Testing Library

#### Query Methods (getByRole, getByLabelText)
```
const bioElement = screnn.getByRole("textBox", { 
                name: "bio" 
            });
expect(bioElement).toBeInTheDocument();
``` 


```
import {render, renderHook, screen} from '@testing-library/react'

```