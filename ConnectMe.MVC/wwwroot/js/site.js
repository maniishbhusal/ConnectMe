function editPost(postId) {
    $.get('/Posts/Edit/' + postId)
        .done(function (response) {
            if (response.success) {
                $('#editPostId').val(postId);
                $('#editTitle').val(response.post.title);
                $('#editDescription').val(response.post.description);
                $('#editModal').modal('show');
            }
        });
}

function updatePost() {
    var postId = $('#editPostId').val();
    var formData = new FormData($('#editForm')[0]);

    $.ajax({
        url: '/Posts/Edit/' + postId,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
        },
        success: function (response) {
            if (response.success) {
                location.reload();
            } else {
                alert(response.message || 'Error updating post');
            }
        },
        error: function () {
            alert('Error updating post');
        }
    });
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        $.post('/Posts/Delete/' + postId, {
            '__RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
        })
            .done(function (response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert('Error deleting post');
                }
            })
            .fail(function () {
                alert('Error deleting post');
            });
    }
}

// Functions for post creation appear when + button is clicked
function togglePostForm() {
    const form = document.getElementById('postCreationForm');
    form.classList.toggle('d-none'); // Toggle visibility
}

// Close button functionality
document.getElementById('closePostForm').addEventListener('click', () => {
    const form = document.getElementById('postCreationForm');
    form.classList.add('d-none'); // Hide form
});