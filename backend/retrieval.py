def retrieve_relevant_chunks(question, chunks, top_k=3):
    question_words = question.lower().split()

    scored_chunks = []

    for chunk in chunks:
        score = 0
        chunk_lower = chunk.lower()

        for word in question_words:
            if word in chunk_lower:
                score += 1

        scored_chunks.append((score, chunk))

    scored_chunks.sort(reverse=True, key=lambda x: x[0])

    return [chunk for score, chunk in scored_chunks[:top_k]]