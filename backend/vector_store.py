import faiss
import numpy as np


class VectorStore:

    def __init__(self, dimension):
        self.index = faiss.IndexFlatL2(dimension)
        self.chunks = []

    def add_embeddings(self, embeddings, chunks):
        vectors = np.array(embeddings).astype("float32")
        self.index.add(vectors)
        self.chunks.extend(chunks)

    def search(self, query_embedding, top_k=3):
        query = np.array([query_embedding]).astype("float32")

        distances, indices = self.index.search(query, top_k)

        return [self.chunks[i] for i in indices[0] if i != -1]