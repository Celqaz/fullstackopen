import React from 'react';
import {useField} from "../hooks";
import {CommentType} from "../types";
import commentServices from "../services/comment.service";

export default function CommentForm(props: Pick<CommentType, "blogID">) {
    const commentField = useField('text')
    const {blogID} = props
    const formSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const newComment: CommentType = {
            content: commentField.value,
            blogID,
        }
        await commentServices.postNewComment(newComment)
        commentField.clearValue()
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <input
                    type={commentField.type}
                    value={commentField.value}
                    onChange={commentField.onChange}
                />
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    )
}
