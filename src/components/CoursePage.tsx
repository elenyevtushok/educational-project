import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { courseApi } from '../api/course-api';
import { Course } from '../dto/Course';

export const CoursePage = () => {
	const { id } = useParams();
	const[course, setCourse] = useState<Course | null>(null)
	
	useEffect(() => {
		async function getCourse() {
			const course = await courseApi.getCourse(id!);
			setCourse(course)
		}
		getCourse();

	}, [id]);

	return (
		<div>I'm course {id}
			<div>I'm course {course?.title}</div>
		</div>
		
	)
}
