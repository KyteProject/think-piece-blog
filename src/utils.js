export const collectPosts = ( doc ) => {
	return { id: doc.id, ...doc.data() };
};
