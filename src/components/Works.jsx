import React from 'react'
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { git, github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';


const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={
          {
            max: 45,
            scale: 1,
            speed: 450
          }
        }
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alg={name}
            className='w-full h-full object-cover rounded-2xl'
          />


          <div className='absolute inset-0 flex justify-end m-3 card_img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alg={github}
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5 '>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary'>{description}</p>
        </div>


        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )

}

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()} >
        <p className={styles.sectionSubText}>My works</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          {/* Followings projects showcases my skills and experiences through read-world examples of my work. Each project is briefly described with links to code repositiries and live demo in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively. */}
          Here are some of the projects I’ve worked on as part of my learning and hands-on practice. Each project includes a short description along with links to the source code and live demo. These projects highlight my ability to understand core concepts, apply different technologies, and build functional solutions while continuously improving my skills.
        </motion.p>

      </div>

      {/* for the project card */}
      <div className='mt-20 flex flex-wrap gap-7 '>
        {
          projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))
        }
      </div>
    </>
  )
}

export default SectionWrapper(Works, "")