import {
  connectDatabase,
  fetchDocuments,
  insertDocument,
} from '../../../helpers/db-util';

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim === '' ||
      !text ||
      text.trim === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      res.status(201).json({
        message: 'Added Comment',
        comment: {
          id: result.insertedId,
          email: email,
          name: name,
          text: text,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Insertion to the database failed!' });
      client.close();
      return;
    }
  } else if (req.method === 'GET') {
    try {
      const documents = await fetchDocuments(
        client,
        'comments',
        { eventId: eventId },
        { _id: -1 }
      );

      res.status(200).json({
        comments: documents,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to fetch data from the database!' });
      client.close();
      return;
    }
  }
};

export default handler;
