document.querySelectorAll('.emoji-box').forEach(box => {
    box.addEventListener('click', () => {
      
      document.querySelectorAll('.emoji-box').forEach(b => b.classList.remove('selected'));
      
      box.classList.add('selected');
      const reaction = box.getAttribute('data-reaction');
      localStorage.setItem('reaction', reaction);
    });
  });
  
  function saveFeedback() {
    const feedback = document.getElementById('feedback').value;
    const reply = document.getElementById('reply').value;
    localStorage.setItem('comment', feedback);
    localStorage.setItem('reply', reply);
    alert("Your feedback was saved locally!");
  }
  
  
  window.onload = function () {
    const savedReaction = localStorage.getItem('reaction');
    if (savedReaction) {
      const selectedBox = document.querySelector(`[data-reaction="${savedReaction}"]`);
      if (selectedBox) selectedBox.classList.add('selected');
    }
  
    const savedComment = localStorage.getItem('comment');
    if (savedComment) document.getElementById('feedback').value = savedComment;
  
    const savedReply = localStorage.getItem('reply');
    if (savedReply) document.getElementById('reply').value = savedReply;
  };
  





  let selectedReaction = "";


const emojiBoxes = document.querySelectorAll(".emoji-box");
emojiBoxes.forEach(box => {
  box.addEventListener("click", () => {
    emojiBoxes.forEach(b => b.classList.remove("selected"));
    box.classList.add("selected");
    selectedReaction = box.querySelector("h4").innerText;
  });
});


function saveFeedback() {
  const comment = document.getElementById("feedback").value.trim();
  if (!selectedReaction || !comment) {
    alert("Please select a reaction and enter your comment.");
    return;
  }

  const feedbackData = {
    reaction: selectedReaction,
    comment: comment,
    reply: ""
  };

  
  const drafts = JSON.parse(localStorage.getItem("feedbackDrafts")) || [];
  drafts.push(feedbackData);
  localStorage.setItem("feedbackDrafts", JSON.stringify(drafts));

  
  window.location.href = "feedback.html";
}


window.addEventListener("load", () => {
  const replyMessage = localStorage.getItem("replyToAgrifeedback");
  if (replyMessage) {
    document.getElementById("reply").value = replyMessage;
    localStorage.removeItem("replyToAgrifeedback");
  }
});