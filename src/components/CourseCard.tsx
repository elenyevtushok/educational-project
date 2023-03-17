import { CoursePreview } from '../dto/Course';

import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import "./styles/courseCardStyle.css"
const CourseCard = ({ coursePreview }: { coursePreview: CoursePreview }) => {
	return (
		<div className="box">
			<div className="box-top">
				<img className="box-image" src={`${coursePreview.previewImageLink}/cover.webp`} alt={coursePreview.title} />
				<div className="title-flex">
					<h3 className="box-title">{coursePreview.title}</h3>
					<p className="lessons-info">Lessons: {coursePreview.lessonsCount}</p>
				</div>
				<Rate disabled allowHalf value={coursePreview.rating} />
				<p className="description">{coursePreview.description}</p>
				<div className='list-of-skills'>
					<p className='skills-header'> Skills you'll achieve:</p>
					<ul >
						{coursePreview.meta.skills?.map(skill => {
							return <li key={skill}>{skill}</li>
						})}
					</ul>
				</div>
			</div>
			<button className="button">
				<Link to={`course/${coursePreview.id}`}>Open Course</Link>
			</button>
		</div>

	)
};

export default CourseCard;