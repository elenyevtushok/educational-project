import React from 'react';
import { CoursePreview } from '../dto/Course';

import { Card, List } from 'antd';

const { Meta } = Card;

const CourseCard = ({ coursePreview } : {coursePreview : CoursePreview}) => {
	return(
		<Card
			hoverable
			style={{ width: 400 }}
			cover={<img alt="example" src="https://cdn.elearningindustry.com/wp-content/uploads/2022/09/10-Ways-To-Improve-Employee-Productivity-In-The-Workplace.jpg" />}
		>
			<Meta title={coursePreview.title} 
				description={coursePreview.description}  />
			<div>
				<p>Lessons in course: {coursePreview.lessonsCount}</p>
				<ul> Skill you'll achieve:
					{coursePreview.meta.skills?.map(skill => {
						return <li key = {skill}>{skill}</li>
					})}
				</ul>
				<p>{coursePreview.rating} / 5</p>
				</div>
		</Card>
	)
};

export default CourseCard;