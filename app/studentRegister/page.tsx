'use client'; // Required for Next.js 13+ App Router

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  School, 
  Building, 
  Calendar,
  User,
  BookOpen,
  Target
} from 'lucide-react';

// Validation Schema
const studentDetailsSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender',
  }),
  
  // Education Type
  educationType: z.enum(['school', 'college'], {
    required_error: 'Please select education type',
  }),
  
  // School Details - conditionally required
  class: z.string().optional(),
  schoolName: z.string().optional(),
  stream: z.string().optional(),
  
  // College Details - conditionally required
  department: z.string().optional(),
  passingYear: z.string().optional(),
  pursuingDegree: z.string().optional(),
  organization: z.string().optional(),
}).refine((data) => {
  // Custom validation for school
  if (data.educationType === 'school') {
    return data.class && data.class.length > 0 && data.schoolName && data.schoolName.length > 0;
  }
  return true;
}, {
  message: "Class and School Name are required for school students",
  path: ["class"]
}).refine((data) => {
  // Custom validation for college
  if (data.educationType === 'college') {
    return data.department && data.department.length > 0 && 
           data.passingYear && data.passingYear.length > 0 &&
           data.pursuingDegree && data.pursuingDegree.length > 0 &&
           data.organization && data.organization.length > 0;
  }
  return true;
}, {
  message: "All college details are required for college students",
  path: ["department"]
});

type StudentFormData = z.infer<typeof studentDetailsSchema>;

const StudentRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [educationType, setEducationType] = useState<'school' | 'college' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    getValues,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentDetailsSchema),
    defaultValues: {
      gender: undefined,
      educationType: undefined,
    },
    mode: 'onChange'
  });

  const watchedEducationType = watch('educationType');
  const watchedClass = watch('class');

  // Update local state when form educationType changes
  useEffect(() => {
    if (watchedEducationType) {
      setEducationType(watchedEducationType);
    }
  }, [watchedEducationType]);

  const steps = [
    { id: 1, name: 'Personal Info', icon: User },
    { id: 2, name: 'Education Type', icon: GraduationCap },
    { id: 3, name: educationType === 'school' ? 'School Details' : 'College Details', icon: BookOpen },
    { id: 4, name: 'Complete', icon: Target },
  ];

  const classes = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const passingYears = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const departments = [
    'Engineering',
    'Pharmacy',
    'Management',
    'Medicine',
    'Arts',
    'Science',
    'Commerce',
    'Law',
    'Architecture',
    'Computer Applications',
    'Education',
    'Other'
  ];

  const streams = [
    'Science',
    'Commerce',
    'Arts',
    'Vocational',
    'Other'
  ];

  const handleNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger(['firstName', 'lastName', 'dob', 'gender']);
    } else if (currentStep === 2) {
      isValid = await trigger(['educationType']);
    } else if (currentStep === 3) {
      if (educationType === 'school') {
        isValid = await trigger(['class', 'schoolName']);
      } else {
        isValid = await trigger(['department', 'passingYear', 'pursuingDegree', 'organization']);
      }
    }

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: StudentFormData) => {
    console.log('Complete Student registration data:', data);
    // Handle form submission - all data will be available here
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  // Debug function to see current form values
  const debugFormValues = () => {
    const values = getValues();
    console.log('Current form values:', values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <GraduationCap className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Complete Your Student Profile</h1>
            <p className="text-purple-100">Tell us more about your educational journey</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        currentStep >= step.id
                          ? 'bg-white text-purple-600 border-white'
                          : 'border-purple-300 text-purple-300'
                      } transition-all duration-300`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        currentStep >= step.id ? 'text-white' : 'text-purple-300'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step.id ? 'bg-white' : 'bg-purple-300'
                      } transition-all duration-300`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        {...register('firstName')}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register('lastName')}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        {...register('dob')}
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                      {errors.dob && (
                        <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        {...register('gender')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Education Type */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Education Level</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        watchedEducationType === 'school'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        {...register('educationType')}
                        type="radio"
                        value="school"
                        className="sr-only"
                      />
                      <School className={`w-12 h-12 mb-3 ${
                        watchedEducationType === 'school' ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <span className="font-semibold text-gray-800">School Student</span>
                      <p className="text-sm text-gray-500 text-center mt-2">
                        Currently studying in school (Classes 1-12)
                      </p>
                    </motion.label>

                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        watchedEducationType === 'college'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        {...register('educationType')}
                        type="radio"
                        value="college"
                        className="sr-only"
                      />
                      <Building className={`w-12 h-12 mb-3 ${
                        watchedEducationType === 'college' ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <span className="font-semibold text-gray-800">College Student</span>
                      <p className="text-sm text-gray-500 text-center mt-2">
                        Pursuing degree/diploma in college/university
                      </p>
                    </motion.label>
                  </div>
                  {errors.educationType && (
                    <p className="text-red-500 text-sm text-center">{errors.educationType.message}</p>
                  )}
                </motion.div>
              )}

              {/* Step 3: Education Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {educationType === 'school' ? 'School Details' : 'College Details'}
                  </h2>

                  {educationType === 'school' ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Class *
                          </label>
                          <select
                            {...register('class')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select Class</option>
                            {classes.map(cls => (
                              <option key={cls} value={cls.toString()}>
                                Class {cls}
                              </option>
                            ))}
                          </select>
                          {errors.class && (
                            <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            School Name *
                          </label>
                          <input
                            {...register('schoolName')}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your school name"
                          />
                          {errors.schoolName && (
                            <p className="text-red-500 text-sm mt-1">{errors.schoolName.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Show stream selection only for classes above 10 */}
                      {Number(watchedClass) > 10 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stream (Optional)
                          </label>
                          <select
                            {...register('stream')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select Stream</option>
                            {streams.map(stream => (
                              <option key={stream} value={stream}>
                                {stream}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department *
                        </label>
                        <select
                          {...register('department')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select Department</option>
                          {departments.map(dept => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        {errors.department && (
                          <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Passing Year *
                        </label>
                        <select
                          {...register('passingYear')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select Year</option>
                          {passingYears.map(year => (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          ))}
                        </select>
                        {errors.passingYear && (
                          <p className="text-red-500 text-sm mt-1">{errors.passingYear.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pursuing Degree *
                        </label>
                        <input
                          {...register('pursuingDegree')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., B.Tech, BBA, B.Sc"
                        />
                        {errors.pursuingDegree && (
                          <p className="text-red-500 text-sm mt-1">{errors.pursuingDegree.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization *
                        </label>
                        <input
                          {...register('organization')}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="College/University name"
                        />
                        {errors.organization && (
                          <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Completion */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Target className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Complete!</h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Thank you for completing your student profile. You're now ready to start your learning journey with us.
                  </p>
                  
                  {/* Debug button to see all form data */}
                  <button
                    type="button"
                    onClick={debugFormValues}
                    className="mb-4 text-sm text-gray-500 underline"
                  >
                    Debug: Check Form Values
                  </button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Start Learning Journey
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between mt-8 pt-6 border-t border-gray-200"
              >
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {currentStep === 3 ? 'Complete' : 'Next'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;