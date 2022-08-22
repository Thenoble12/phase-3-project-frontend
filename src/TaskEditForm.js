function EditReviewForm({ review, onUpdateReview }) {
    const [comment, setComment] = useState("");
    const [score, setScore] = useState("0");
  
    function handleSubmit(e) {
      e.preventDefault();
      fetch(`http://localhost:9292/reviews/${review.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
          score: score,
        }),
      })
        .then((r) => r.json())
        .then((updatedReview) => onUpdateReview(updatedReview));
    }
  
    return <form onSubmit={handleSubmit}>{/* controlled form code here*/}</form>;
  }