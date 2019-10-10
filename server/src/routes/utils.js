module.exports.crudRef = async (prototype, ref, data) =>
{
	try
	{
		switch(prototype)
		{
			case 'get':
			{
				return await ref.once('value');
				break;
			}
			case 'post':
			{
				ref.push().set(data);
				break;
			}
			case 'update':
			{
				ref.update(data);
				break;
			}
			case 'delete':
			{
				ref.remove();
				break;
			}
		}
	}
	catch(err)
	{
		console.log(err);
	}
};

module.exports.getChild = async itemChild =>
{
	try
	{	
		let result;

		itemChild.forEach(child => 
		{
			result = child
		});

		return result
	}
	catch(err)
	{
		console.log(err)
	}
}

module.exports.deleteComponent = async field =>
{
	try
	{
		field.forEach(fieldChild =>
		{
			this.crudRef('delete', fieldChild.ref);
		})
	}
	catch(err)
	{
		console.log(err);
	}
};

module.exports.toArray = async (model, child) =>
{
	try
	{
		const result = [];

		switch(child)
		{
			case 'following':
			{
				childData = model.following;
				break;
			}

			case 'experience':
			{
				childData = model.experience;
				break;
			}

			case 'education':
			{
				childData = model.education;
				break;
			}

			case 'like':
			{
				childData = model.like;
				break;
			}

			case 'comment':
			{
				childData = model.comment;
				break;
			}

			default:
			{
				console.log('Wrong child');
				break;
			}
		}

		for(let key in childData)
		{
			if(child === 'following')
			{
				result.push(childData[key]);
			}
			else
			{
				child = childData[key];
				child.id = key;
				result.push(child);
			}
		}

		return result;
	}
	catch(err)
	{
		console.log(err);
	}
};

module.exports.startEnd = (perPage, page, length) =>
{
	let start = perPage*(page - 1);

	if(start >= length)
	{
		return { err: true }
	}

	let end = perPage*page - 1 > length - 1 ? length - 1 : perPage*page - 1;

	return {
		err: false,
		start,
		end
	}
}

