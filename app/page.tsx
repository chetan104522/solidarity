'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaUserFriends, 
  FaSchool, 
  FaBuilding,
  FaChartLine,
  FaRoad,
  FaCertificate,
  FaRocket
} from 'react-icons/fa';

const AnimatedSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Solidarity
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              &ldquo;The bridge between dreams and direction — where potential finds purpose, and every learner discovers their path.&rdquo;
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => router.push('/login')}
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connecting students, mentors, counselors, parents, institutes, and companies in one unified ecosystem.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaUserGraduate, title: 'Students', desc: 'Personalized career paths and skill development' },
              { icon: FaChalkboardTeacher, title: 'Mentors', desc: 'Guide and inspire the next generation' },
              { icon: FaUserFriends, title: 'Counselors', desc: 'Professional guidance and support' },
              { icon: FaSchool, title: 'Institutes', desc: 'Comprehensive ERP and analytics' },
              { icon: FaBuilding, title: 'Companies', desc: 'Access talent and post opportunities' },
              { icon: FaChartLine, title: 'Parents', desc: 'Track and support student progress' },

            ].map((role, index) => (
              <AnimatedSection key={index} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <role.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-gray-600">{role.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Solidarity Works</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              A seamless journey from discovery to mastery
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Assessment', desc: 'Psychometric and academic evaluation to understand your potential' },
              { step: '02', title: 'Personalized Roadmap', desc: '7-day customized learning path based on your results' },
              { step: '03', title: 'SWOT Analysis', desc: 'Detailed strengths, weaknesses, opportunities, and threats report' },
              { step: '04', title: 'Skill Building', desc: 'Structured training programs and mentorship opportunities' },
              { step: '05', title: 'Career Guidance', desc: 'Expert counseling and career path recommendations' },
              { step: '06', title: 'Certification', desc: 'Recognized certificates for completed programs and skills' },
            ].map((item, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-white"
                >
                  <div className="text-3xl font-bold text-blue-200 mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-blue-100">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Modules Section */}
      <section id="for-students" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Platform Modules</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive features designed to support every aspect of student development
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
             
            'Assessment Engine',
              'Report & Eligibility Logic',
              'Roadmap Module',
              'SWOT Analysis Generator',
              'Mentor/Counsellor Dashboard',
              'Institute ERP Panel',
              'Company Dashboard',
              
            ].map((module, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300"
                >
                  <FaCertificate className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{module}</span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Discover Your Path?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their direction through Solidarity
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Start Your Assessment Today
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;