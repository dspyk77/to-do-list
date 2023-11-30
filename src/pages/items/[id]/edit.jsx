import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [task, setTask] = useState('');
  const [importance, setImportance] = useState('');
  const [due, setDue] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/items/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const itemData = await response.json();

        setTask(itemData.task);
        setImportance(itemData.importance);
        setDue(itemData.due);
      } else {
        console.error(response);
      }
    };

    fetchItem();
  }, [id]);

  const sendUpdateItemRequest = async () => {
    const updatedItem = {
      task: task,
      importance: importance,
      due: due
    };

    const response = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    });

    if (response.ok) {
      const createdItem = await response.json();
      console.log(`Updated item: ${JSON.stringify(createdItem)}`);

      router.push(`/items/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="task-name">
        <Form.Label>Task Name</Form.Label>

        <Form.Control
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="importance-level" className="mt-3">
        <Form.Label>Importance Level</Form.Label>
        <Form.Control
          type="text"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="due" className="mt-3">
        <Form.Label>Due by</Form.Label>
        <Form.Control
          type="text"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateItemRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;
