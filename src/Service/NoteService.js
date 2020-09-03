export const NoteService = {

	listAll() {
		return [{
			id: '1',
			title: 'Minha primeira anotação',
			dateCreation: new Date("2019-07-01"),
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis consectetur soluta? Nam est ex officiis molestiae, ab laboriosam repudiandae neque nihil non eum laudantium quidem voluptatum facilis, ipsam repellendus.'
		},
		{
			id: '2',
			title: 'Segunda nota!',
			dateCreation: new Date("2019-10-28"),
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis consectetur soluta? Nam est ex officiis molestiae, ab laboriosam repudiandae neque nihil non eum laudantium quidem voluptatum facilis, ipsam repellendus.'
		},
		{
			id: '3',
			title: 'Hoje vai a 3ª nota',
			dateCreation: new Date("2020-01-09"),
			content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis consectetur soluta? Nam est ex officiis molestiae, ab laboriosam repudiandae neque nihil non eum laudantium quidem voluptatum facilis, ipsam repellendus.'
		}]
	}

};