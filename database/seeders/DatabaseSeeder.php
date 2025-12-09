<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\ForumPost;
use App\Models\ForumComment;
use App\Models\Message;
use App\Models\UserMatch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	use WithoutModelEvents;

	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		// ==========================================
		// 1. CREATE USERS WITH PROFILES
		// ==========================================

		// Create Mentors (experienced developers/professionals)
		$mentor1 = User::factory()->create([
			'name' => 'Dr. Sarah Chen',
			'email' => 'sarah.chen@example.com',
			'password' => bcrypt('password'),
		]);
		$mentor1->profile()->create([
			'bio' => 'Senior Software Engineer with 10+ years of experience in full-stack development. Passionate about mentoring the next generation of developers.',
			'skills' => 'Laravel, React, Docker, AWS, PostgreSQL, System Design',
			'interests' => 'Web Development, Cloud Architecture, Teaching, Open Source',
			'major' => 'Computer Science',
		]);

		$mentor2 = User::factory()->create([
			'name' => 'James Rodriguez',
			'email' => 'james.r@example.com',
			'password' => bcrypt('password'),
		]);
		$mentor2->profile()->create([
			'bio' => 'AI/ML researcher and educator. Love working with students on innovative projects.',
			'skills' => 'Python, TensorFlow, PyTorch, NLP, Computer Vision',
			'interests' => 'Artificial Intelligence, Machine Learning, Research, Innovation',
			'major' => 'Artificial Intelligence',
		]);

		$mentor3 = User::factory()->create([
			'name' => 'Emily Watson',
			'email' => 'emily.watson@example.com',
			'password' => bcrypt('password'),
		]);
		$mentor3->profile()->create([
			'bio' => 'UX/UI Designer turned developer. Helping students create beautiful and functional applications.',
			'skills' => 'Figma, React, TypeScript, Tailwind CSS, User Research',
			'interests' => 'UI/UX Design, Frontend Development, Accessibility, User Experience',
			'major' => 'Interaction Design',
		]);

		$mentor4 = User::factory()->create([
			'name' => 'Michael Chang',
			'email' => 'michael.chang@example.com',
			'password' => bcrypt('password'),
		]);
		$mentor4->profile()->create([
			'bio' => 'DevOps Engineer with expertise in CI/CD and cloud infrastructure. Happy to guide students in modern development practices.',
			'skills' => 'Docker, Kubernetes, Jenkins, GitHub Actions, Terraform',
			'interests' => 'DevOps, Cloud Computing, Automation, Best Practices',
			'major' => 'Software Engineering',
		]);

		$mentor5 = User::factory()->create([
			'name' => 'Dr. Aisha Patel',
			'email' => 'aisha.patel@example.com',
			'password' => bcrypt('password'),
		]);
		$mentor5->profile()->create([
			'bio' => 'Data Scientist and educator. Specializing in statistical analysis and data visualization.',
			'skills' => 'Python, R, SQL, Tableau, Data Analysis, Statistics',
			'interests' => 'Data Science, Analytics, Teaching, Research',
			'major' => 'Statistics',
		]);

		// Create Mentees (students seeking guidance)
		$mentee1 = User::factory()->create([
			'name' => 'Alex Thompson',
			'email' => 'alex.t@example.com',
			'password' => bcrypt('password'),
		]);
		$mentee1->profile()->create([
			'bio' => 'Second-year CS student eager to learn web development and build real-world projects.',
			'skills' => 'HTML, CSS, JavaScript, Python basics',
			'interests' => 'Web Development, Mobile Apps, Game Development',
			'major' => 'Computer Science',
		]);

		$mentee2 = User::factory()->create([
			'name' => 'Sophia Martinez',
			'email' => 'sophia.m@example.com',
			'password' => bcrypt('password'),
		]);
		$mentee2->profile()->create([
			'bio' => 'Aspiring data scientist looking for guidance in ML projects and career advice.',
			'skills' => 'Python, Pandas, NumPy, Basic ML concepts',
			'interests' => 'Machine Learning, Data Analysis, Research',
			'major' => 'Data Science',
		]);

		$mentee3 = User::factory()->create([
			'name' => 'Ryan Lee',
			'email' => 'ryan.lee@example.com',
			'password' => bcrypt('password'),
		]);
		$mentee3->profile()->create([
			'bio' => 'First-year student passionate about building user-friendly applications.',
			'skills' => 'React basics, CSS, Figma',
			'interests' => 'Frontend Development, UI/UX, Design Systems',
			'major' => 'Software Engineering',
		]);

		$mentee4 = User::factory()->create([
			'name' => 'Priya Sharma',
			'email' => 'priya.s@example.com',
			'password' => bcrypt('password'),
		]);
		$mentee4->profile()->create([
			'bio' => 'Interested in cloud computing and backend development. Looking to build scalable systems.',
			'skills' => 'Java, Spring Boot, MySQL, Basic AWS',
			'interests' => 'Backend Development, Cloud Services, System Design',
			'major' => 'Information Technology',
		]);

		$mentee5 = User::factory()->create([
			'name' => 'David Kim',
			'email' => 'david.kim@example.com',
			'password' => bcrypt('password'),
		]);
		$mentee5->profile()->create([
			'bio' => 'Third-year student working on AI projects and seeking research opportunities.',
			'skills' => 'Python, TensorFlow basics, OpenCV',
			'interests' => 'Computer Vision, Deep Learning, Robotics',
			'major' => 'Computer Engineering',
		]);

		// Additional diverse students
		$mentee6 = User::factory()->create([
			'name' => 'Isabella Garcia',
			'email' => 'isabella.g@example.com',
			'password' => bcrypt('password'),
		]);
		$mentee6->profile()->create([
			'bio' => 'Passionate about cybersecurity and ethical hacking. Want to learn secure coding practices.',
			'skills' => 'Python, Bash, Networking basics',
			'interests' => 'Cybersecurity, Penetration Testing, Security Research',
			'major' => 'Cybersecurity',
		]);

		// Create the Test User
		$testUser = User::factory()->create([
			'name' => 'Test User',
			'email' => 'test@example.com',
			'password' => bcrypt('password'),
		]);
		$testUser->profile()->create([
			'bio' => 'I am the main test user exploring the mentorship platform.',
			'skills' => 'Full-stack Development, Testing, Debugging',
			'interests' => 'Learning, Collaboration, Quality Assurance',
			'major' => 'Information Technology',
		]);

		// ==========================================
		// 2. CREATE PROJECTS
		// ==========================================

		$project1 = Project::create([
			'title' => 'Build a Mentorship Portal',
			'description' => 'A comprehensive web application to connect mentors and mentees. Features include user profiles, matchmaking, project collaboration, forum discussions, and real-time chat.',
			'deadline' => now()->addMonth(),
			'tags' => ['laravel', 'react', 'docker', 'tailwind'],
			'owner_id' => $mentor1->id,
		]);
		$project1->members()->attach([$mentor1->id, $mentee1->id, $mentee3->id]);

		$project2 = Project::create([
			'title' => 'AI Research Group: LLM Applications',
			'description' => 'Researching practical applications of Large Language Models in education. Building tools for automated tutoring and content generation.',
			'deadline' => now()->addMonths(3),
			'tags' => ['python', 'ai', 'ml', 'nlp'],
			'owner_id' => $mentor2->id,
		]);
		$project2->members()->attach([$mentor2->id, $mentee2->id, $mentee5->id]);

		$project3 = Project::create([
			'title' => 'Mobile App for Campus Events',
			'description' => 'Developing a mobile application to help students discover and organize campus events. Features include event calendar, RSVPs, and social sharing.',
			'deadline' => now()->addWeeks(6),
			'tags' => ['react-native', 'firebase', 'typescript'],
			'owner_id' => $mentee1->id,
		]);
		$project3->members()->attach([$mentee1->id, $mentee3->id]);

		$project4 = Project::create([
			'title' => 'E-Commerce Platform Development',
			'description' => 'Building a full-featured e-commerce platform with payment integration, inventory management, and analytics dashboard.',
			'deadline' => now()->addMonths(4),
			'tags' => ['vue', 'nodejs', 'mongodb', 'stripe'],
			'owner_id' => $mentor1->id,
		]);
		$project4->members()->attach([$mentor1->id, $mentee4->id]);

		$project5 = Project::create([
			'title' => 'Data Visualization Dashboard',
			'description' => 'Creating interactive dashboards for analyzing university enrollment data and student performance metrics.',
			'deadline' => now()->addMonths(2),
			'tags' => ['python', 'dash', 'plotly', 'pandas'],
			'owner_id' => $mentor5->id,
		]);
		$project5->members()->attach([$mentor5->id, $mentee2->id]);

		$project6 = Project::create([
			'title' => 'Cybersecurity Awareness Platform',
			'description' => 'Educational platform with interactive modules teaching cybersecurity best practices and common vulnerabilities.',
			'deadline' => now()->addWeeks(8),
			'tags' => ['security', 'education', 'web', 'gamification'],
			'owner_id' => $mentee6->id,
		]);
		$project6->members()->attach([$mentee6->id, $testUser->id]);

		// ==========================================
		// 3. CREATE FORUM POSTS AND COMMENTS
		// ==========================================

		$forumPost1 = ForumPost::create([
			'user_id' => $mentor1->id,
			'title' => 'Welcome to the Mentorship Portal!',
			'content' => 'Hello everyone! I\'m excited to be part of this community. As a senior developer, I\'m here to help students with web development questions, code reviews, and career advice. Feel free to reach out!',
		]);

		ForumComment::create([
			'post_id' => $forumPost1->id,
			'user_id' => $mentee1->id,
			'content' => 'Thank you for offering to help! I\'m looking forward to learning from experienced developers like you.',
		]);

		ForumComment::create([
			'post_id' => $forumPost1->id,
			'user_id' => $testUser->id,
			'content' => 'This platform is amazing! Excited to connect with both mentors and peers.',
		]);

		$forumPost2 = ForumPost::create([
			'user_id' => $mentee2->id,
			'title' => 'How to get started with Machine Learning?',
			'content' => 'I\'m a second-year student interested in ML but feeling overwhelmed by all the resources. What\'s the best learning path for beginners? Should I start with theory or jump into projects?',
		]);

		ForumComment::create([
			'post_id' => $forumPost2->id,
			'user_id' => $mentor2->id,
			'content' => 'Great question! I recommend starting with Andrew Ng\'s Machine Learning course on Coursera for theory, then work on simple projects like linear regression on real datasets. The key is balancing theory with hands-on practice.',
		]);

		ForumComment::create([
			'post_id' => $forumPost2->id,
			'user_id' => $mentor5->id,
			'content' => 'Also, make sure you\'re comfortable with Python and basic statistics. Those are foundational skills that will make learning ML much easier!',
		]);

		ForumComment::create([
			'post_id' => $forumPost2->id,
			'user_id' => $mentee5->id,
			'content' => 'I started with Kaggle competitions! They have great tutorials and you learn by doing.',
		]);

		$forumPost3 = ForumPost::create([
			'user_id' => $mentor3->id,
			'title' => 'UI/UX Design Principles Every Developer Should Know',
			'content' => 'As someone who transitioned from design to development, I can\'t stress enough how important it is to understand basic design principles. Here are some key concepts: consistency, visual hierarchy, feedback, and accessibility. Happy to discuss more!',
		]);

		ForumComment::create([
			'post_id' => $forumPost3->id,
			'user_id' => $mentee3->id,
			'content' => 'This is so helpful! I struggle with making my apps look professional. Do you have any resources you\'d recommend?',
		]);

		ForumComment::create([
			'post_id' => $forumPost3->id,
			'user_id' => $mentor3->id,
			'content' => 'Absolutely! Check out "Refactoring UI" and "The Design of Everyday Things". Also, study apps you like and try to understand why their interfaces work well.',
		]);

		$forumPost4 = ForumPost::create([
			'user_id' => $mentee4->id,
			'title' => 'Looking for teammates: E-commerce project',
			'content' => 'Hi! I\'m working on an e-commerce platform as part of my coursework and looking for 2-3 teammates interested in backend development. We\'ll be using Node.js and MongoDB. Anyone interested?',
		]);

		ForumComment::create([
			'post_id' => $forumPost4->id,
			'user_id' => $mentee1->id,
			'content' => 'I\'d be interested! I have some experience with Node.js and want to learn more about backend architecture.',
		]);

		$forumPost5 = ForumPost::create([
			'user_id' => $testUser->id,
			'title' => 'Best practices for Docker in development?',
			'content' => 'Just started using Docker for my projects. What are some best practices you all follow? Things like multi-stage builds, volume management, etc.',
		]);

		ForumComment::create([
			'post_id' => $forumPost5->id,
			'user_id' => $mentor4->id,
			'content' => 'Great that you\'re learning Docker! Key tips: 1) Use .dockerignore to exclude unnecessary files, 2) Leverage multi-stage builds for smaller images, 3) Don\'t run containers as root, 4) Use docker-compose for local dev. I can do a workshop on this if there\'s interest!',
		]);

		ForumComment::create([
			'post_id' => $forumPost5->id,
			'user_id' => $testUser->id,
			'content' => 'A workshop would be amazing! I\'d definitely attend.',
		]);

		$forumPost6 = ForumPost::create([
			'user_id' => $mentee6->id,
			'title' => 'Resources for learning cybersecurity?',
			'content' => 'I\'m passionate about cybersecurity and want to pursue a career in this field. What certifications, platforms, or projects would you recommend for someone just starting out?',
		]);

		ForumComment::create([
			'post_id' => $forumPost6->id,
			'user_id' => $mentor1->id,
			'content' => 'TryHackMe and HackTheBox are excellent platforms for hands-on learning. For certifications, consider starting with CompTIA Security+ or CEH. Also, learn about OWASP Top 10 vulnerabilities!',
		]);

		// ==========================================
		// 4. CREATE MESSAGES (CHAT)
		// ==========================================

		// Conversation between Test User and Mentor 1
		Message::create([
			'sender_id' => $testUser->id,
			'receiver_id' => $mentor1->id,
			'content' => 'Hi Dr. Chen! I saw your profile and I\'m really interested in learning more about full-stack development. Would you be open to mentoring me?',
		]);

		Message::create([
			'sender_id' => $mentor1->id,
			'receiver_id' => $testUser->id,
			'content' => 'Hi! Of course, I\'d be happy to help! What areas are you most interested in learning about?',
		]);

		Message::create([
			'sender_id' => $testUser->id,
			'receiver_id' => $mentor1->id,
			'content' => 'I want to learn about building scalable web applications with Laravel and React. Also interested in Docker and deployment strategies.',
		]);

		Message::create([
			'sender_id' => $mentor1->id,
			'receiver_id' => $testUser->id,
			'content' => 'Perfect! Those are great skills to have. Let\'s set up a video call this week to discuss a learning plan. I can also add you to one of my active projects.',
		]);

		// Conversation between Mentee 2 and Mentor 2 (AI/ML)
		Message::create([
			'sender_id' => $mentee2->id,
			'receiver_id' => $mentor2->id,
			'content' => 'Hello James! I\'m working on a sentiment analysis project and running into issues with model accuracy. Could you help me debug?',
		]);

		Message::create([
			'sender_id' => $mentor2->id,
			'receiver_id' => $mentee2->id,
			'content' => 'Sure! Send me your code and dataset description. Let\'s start by looking at your data preprocessing and feature engineering.',
		]);

		Message::create([
			'sender_id' => $mentee2->id,
			'receiver_id' => $mentor2->id,
			'content' => 'Thanks! I\'ll send the GitHub link. Also, do you have time for a quick call tomorrow?',
		]);

		// Conversation between Mentee 3 and Mentor 3 (UI/UX)
		Message::create([
			'sender_id' => $mentee3->id,
			'receiver_id' => $mentor3->id,
			'content' => 'Hi Emily! I attended your talk on design systems and found it super helpful. Can I get your feedback on a project I\'m working on?',
		]);

		Message::create([
			'sender_id' => $mentor3->id,
			'receiver_id' => $mentee3->id,
			'content' => 'Absolutely! I\'d love to see what you\'re working on. Share a Figma link or screenshots and I\'ll give you detailed feedback.',
		]);

		// Peer conversation between mentees
		Message::create([
			'sender_id' => $mentee1->id,
			'receiver_id' => $mentee3->id,
			'content' => 'Hey Ryan! Want to pair program on the mobile app project this weekend?',
		]);

		Message::create([
			'sender_id' => $mentee3->id,
			'receiver_id' => $mentee1->id,
			'content' => 'Yes! Saturday afternoon works for me. Let\'s work on the event calendar feature.',
		]);

		// ==========================================
		// 5. CREATE USER MATCHES
		// ==========================================

		// Test User's swipes
		UserMatch::create([
			'user_id' => $testUser->id,
			'candidate_id' => $mentor1->id,
			'status' => 'liked',
		]);

		UserMatch::create([
			'user_id' => $testUser->id,
			'candidate_id' => $mentor2->id,
			'status' => 'liked',
		]);

		UserMatch::create([
			'user_id' => $testUser->id,
			'candidate_id' => $mentor3->id,
			'status' => 'passed',
		]);

		// Mutual matches
		UserMatch::create([
			'user_id' => $mentor1->id,
			'candidate_id' => $testUser->id,
			'status' => 'matched', // Mutual with test user
		]);

		// Update test user's match to matched status
		UserMatch::where('user_id', $testUser->id)
			->where('candidate_id', $mentor1->id)
			->update(['status' => 'matched']);

		// More matches between mentors and students
		UserMatch::create([
			'user_id' => $mentee1->id,
			'candidate_id' => $mentor1->id,
			'status' => 'liked',
		]);

		UserMatch::create([
			'user_id' => $mentor1->id,
			'candidate_id' => $mentee1->id,
			'status' => 'matched',
		]);

		UserMatch::where('user_id', $mentee1->id)
			->where('candidate_id', $mentor1->id)
			->update(['status' => 'matched']);

		UserMatch::create([
			'user_id' => $mentee2->id,
			'candidate_id' => $mentor2->id,
			'status' => 'matched',
		]);

		UserMatch::create([
			'user_id' => $mentor2->id,
			'candidate_id' => $mentee2->id,
			'status' => 'matched',
		]);

		UserMatch::create([
			'user_id' => $mentee3->id,
			'candidate_id' => $mentor3->id,
			'status' => 'matched',
		]);

		UserMatch::create([
			'user_id' => $mentor3->id,
			'candidate_id' => $mentee3->id,
			'status' => 'matched',
		]);

		// Some passed matches
		UserMatch::create([
			'user_id' => $mentee4->id,
			'candidate_id' => $mentor5->id,
			'status' => 'passed',
		]);

		UserMatch::create([
			'user_id' => $mentee5->id,
			'candidate_id' => $mentor4->id,
			'status' => 'passed',
		]);
	}
}
