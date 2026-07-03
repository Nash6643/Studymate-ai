from backend.text_utils import chunk_text

text = "Hello " * 500

chunks = chunk_text(text)

print(len(chunks))

for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}: {len(chunk)} characters")