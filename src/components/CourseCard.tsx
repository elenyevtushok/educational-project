import React from 'react';
import { CoursePreview } from '../dto/Course';

import { Card } from 'antd';

const { Meta } = Card;


	

const CourseCard = ({ coursePreview } : {coursePreview : CoursePreview}) => {
	return(
		<Card
			hoverable
			style={{ width: 400 }}
			cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
		>
			<Meta title={coursePreview.title} 
				description={coursePreview.description}  />
			<div>
				<p>Lessons in course: {coursePreview.lessonsCount}</p>
				<ul> Skill you'll achieve:
					{coursePreview.meta.skills?.map(skill => {
						return <li>{skill}</li>
					})}
				</ul>
				<p>{coursePreview.rating} / 5</p>
				</div>
		</Card>
	)
};

export default CourseCard;