'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  // Get Prompt Details
  useEffect (() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt${promptId}`)
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    }

    if(promptId) getPromptDetails()
  }, [promptId], console.log("whats this"))


  // Update Prompt
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}` ,{
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        router.push('/');
      } else {
        console.error('Server response:', response);
      }

    } catch (error) {
      console.error('Error editing prompt:', error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
