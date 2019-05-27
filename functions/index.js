const functions = require('firebase-functions'),
	admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!');
});

exports.getAllPosts = functions.https.onRequest(async (request, response) => {
	const snapshot = await firestore.collection('posts').get(),
		posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

	response.json({ posts });
});

exports.sanitizeContent = functions.firestore.document('posts/{postID}').onWrite(async change => {
	if (!change.after.exists) return null;

	const { content, sanitized } = change.after.data();

	if (content && !sanitized) {
		return change.after.ref.update({
			content: content.replace(/CoffeeScript/g, '********'),
			sanitized: true,
		});
	}

	return null;
});

exports.incrementCommentCount = functions.firestore
	.document('posts/{postID}/comments/{commentID}')
	.onCreate(async (snapshot, context) => {
		const { postID } = context.params,
			postRef = firestore.doc(`posts/${postID}`),
			snap = await postRef.get('comments'),
			comments = snap.get('comments');

		return postRef.update({ comments: comments + 1 });
	});
