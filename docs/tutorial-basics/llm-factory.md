---
sidebar_position: 2
---

# LLM Factory

applying factory design pattern.

we created the llm factory abstract class for this reasons:

- make the system Open for extention and close for modification.
- investigate the single responsibility principle.

<!--
Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar` -->

## The Contract Of LLM Factory Class

in the `src/llm/factory.py`:

```jsx title="src/llm/factory.py"
from abc import ABC, abstractmethod

class LLMFactory(ABC):

    @abstractmethod
    def create(self):
        pass
```

A new page is now available at [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Ollama LLM Factory Class

this is the implementation in `src/llm/ollama_factory.py`:

```python title="src/llm/ollama_factory.py"
import os
from llm.factory import LLMFactory
from langchain_community.llms import Ollama
from dotenv import load_dotenv
from settings import env

class OllamaFactory(LLMFactory):
    def __init__(self):
        load_dotenv(override=True)
        self.host =  os.getenv(env.OLLAMA_HOST)
        self.model_name = os.getenv(env.LLAMA3_MODEL_NAME)

    def create(self, model_name : str = None):
        print(model_name)
        if model_name is None:
            return Ollama(model=self.model_name, base_url=self.host)
        else:
            return Ollama(model=model_name, base_url=self.host)

```

<!--
A new page is now available at [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page). -->

<!--








---
sidebar_position: 1
---

# Create a Page

Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## Create your first React Page

Create a file at `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

A new page is now available at [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Create your first Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page). -->
