import React from 'react';
import { CoursePreview } from '../dto/Course';

import { Card, List, Rate } from 'antd';
import { Link } from 'react-router-dom';


const { Meta } = Card;

const CourseCard = ({ coursePreview }: { coursePreview: CoursePreview }) => {
	return (
		<Card
			className='card-component'
			hoverable
			cover={<img alt="example" src="https://cdn.elearningindustry.com/wp-content/uploads/2022/09/10-Ways-To-Improve-Employee-Productivity-In-The-Workplace.jpg" />}
		>
			<Meta title={
				<Link to={`course/${coursePreview.id}`}>{coursePreview.title}</Link>
			}
				description={[
					<div className='card-content'>
						<p>{coursePreview.description}</p>
						<p className='lessons-in-course'>Lessons in course: {coursePreview.lessonsCount}</p>
						<p className='skills-header'> Skills you'll achieve:</p>
						<ul>
							{coursePreview.meta.skills?.map(skill => {
								return <li key={skill}>{skill}</li>
							})}
						</ul>
					</div>
				]} />
			<Rate disabled allowHalf value={coursePreview.rating} />
		</Card>
	)
};

export default CourseCard;