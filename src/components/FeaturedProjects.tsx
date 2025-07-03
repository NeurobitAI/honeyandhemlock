
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

const FeaturedProjects = () => {
  const projects = [
    {
      image: "/lovable-uploads/55b25aea-6a37-4ad7-92fb-78df6ded0d21.png",
      title: "SPACEMAN"
    },
    {
      image: "/lovable-uploads/7a1ff599-69f2-4905-a0ce-0bb4fc99215c.png",
      title: "SPEECHLESS"
    },
    {
      image: "/lovable-uploads/325d73e2-d687-4668-aa2f-5127ad2bbfbb.png",
      title: "SOLITARITY"
    },
    {
      image: "/lovable-uploads/921dc20e-d8e8-4341-8aa0-c542f110c9c8.png",
      title: "BEHIND THE SCENES"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Draggable);

    gsap.set('.box', {
      yPercent: -50,
    });

    const STAGGER = 0.1;
    const DURATION = 1;
    const OFFSET = 0;
    const BOXES = gsap.utils.toArray('.box');

    const LOOP = gsap.timeline({
      paused: true,
      repeat: -1,
      ease: 'none',
    });

    const SHIFTS = [...BOXES, ...BOXES, ...BOXES];

    SHIFTS.forEach((BOX, index) => {
      const BOX_TL = gsap
        .timeline()
        .set(BOX, {
          xPercent: 250,
          rotateY: -50,
          opacity: 0,
          scale: 0.5,
        })
        .to(
          BOX,
          {
            opacity: 1,
            scale: 1,
            duration: 0.1,
          },
          0
        )
        .to(
          BOX,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.1,
          },
          0.9
        )
        .fromTo(
          BOX,
          {
            xPercent: 250,
          },
          {
            xPercent: -350,
            duration: 1,
            immediateRender: false,
            ease: 'power1.inOut',
          },
          0
        )
        .fromTo(
          BOX,
          {
            rotateY: -50,
          },
          {
            rotateY: 50,
            immediateRender: false,
            duration: 1,
            ease: 'power4.inOut',
          },
          0
        )
        .to(
          BOX,
          {
            z: 100,
            scale: 1.25,
            duration: 0.1,
            repeat: 1,
            yoyo: true,
          },
          0.4
        )
        .fromTo(
          BOX,
          {
            zIndex: 1,
          },
          {
            zIndex: BOXES.length,
            repeat: 1,
            yoyo: true,
            ease: 'none',
            duration: 0.5,
            immediateRender: false,
          },
          0
        );
      LOOP.add(BOX_TL, index * STAGGER);
    });

    const CYCLE_DURATION = STAGGER * BOXES.length;
    const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET;

    const LOOP_HEAD = gsap.fromTo(
      LOOP,
      {
        totalTime: START_TIME,
      },
      {
        totalTime: `+=${CYCLE_DURATION}`,
        duration: 1,
        ease: 'none',
        repeat: -1,
        paused: true,
      }
    );

    const PLAYHEAD = {
      position: 0,
    };

    const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration());

    const SCRUB = gsap.to(PLAYHEAD, {
      position: 0,
      onUpdate: () => {
        LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position));
      },
      paused: true,
      duration: 0.25,
      ease: 'power3',
    });

    let iteration = 0;
    const TRIGGER = ScrollTrigger.create({
      start: 0,
      end: '+=2000',
      horizontal: false,
      pin: '.boxes',
      onUpdate: self => {
        const SCROLL = self.scroll();
        if (SCROLL > self.end - 1) {
          WRAP(1, 1);
        } else if (SCROLL < 1 && self.direction < 0) {
          WRAP(-1, self.end - 1);
        } else {
          const NEW_POS = (iteration + self.progress) * LOOP_HEAD.duration();
          SCRUB.vars.position = NEW_POS;
          SCRUB.invalidate().restart();
        }
      },
    });

    const WRAP = (iterationDelta, scrollTo) => {
      iteration += iterationDelta;
      TRIGGER.scroll(scrollTo);
      TRIGGER.update();
    };

    const SNAP = gsap.utils.snap(1 / BOXES.length);

    const progressToScroll = progress =>
      gsap.utils.clamp(
        1,
        TRIGGER.end - 1,
        gsap.utils.wrap(0, 1, progress) * TRIGGER.end
      );

    const scrollToPosition = position => {
      const SNAP_POS = SNAP(position);
      const PROGRESS =
        (SNAP_POS - LOOP_HEAD.duration() * iteration) / LOOP_HEAD.duration();
      const SCROLL = progressToScroll(PROGRESS);
      if (PROGRESS >= 1 || PROGRESS < 0) return WRAP(Math.floor(PROGRESS), SCROLL);
      TRIGGER.scroll(SCROLL);
    };

    ScrollTrigger.addEventListener('scrollEnd', () =>
      scrollToPosition(SCRUB.vars.position)
    );

    const NEXT = () => scrollToPosition(SCRUB.vars.position - 1 / BOXES.length);
    const PREV = () => scrollToPosition(SCRUB.vars.position + 1 / BOXES.length);

    const handleKeyDown = (event) => {
      if (event.code === 'ArrowLeft' || event.code === 'KeyA') NEXT();
      if (event.code === 'ArrowRight' || event.code === 'KeyD') PREV();
    };

    document.addEventListener('keydown', handleKeyDown);

    const boxesElement = document.querySelector('.boxes');
    const handleBoxClick = (e) => {
      const BOX = e.target.closest('.box');
      if (BOX) {
        let TARGET = BOXES.indexOf(BOX);
        let CURRENT = gsap.utils.wrap(
          0,
          BOXES.length,
          Math.floor(BOXES.length * SCRUB.vars.position)
        );
        let BUMP = TARGET - CURRENT;
        if (TARGET > CURRENT && TARGET - CURRENT > BOXES.length * 0.5) {
          BUMP = (BOXES.length - BUMP) * -1;
        }
        if (CURRENT > TARGET && CURRENT - TARGET > BOXES.length * 0.5) {
          BUMP = BOXES.length + BUMP;
        }
        scrollToPosition(SCRUB.vars.position + BUMP * (1 / BOXES.length));
      }
    };

    if (boxesElement) {
      boxesElement.addEventListener('click', handleBoxClick);
    }

    gsap.set('.box', { display: 'block' });
    gsap.set('button', { z: 200 });

    Draggable.create('.drag-proxy', {
      type: 'x',
      trigger: '.box',
      onPress() {
        this.startOffset = SCRUB.vars.position;
      },
      onDrag() {
        SCRUB.vars.position = this.startOffset + (this.startX - this.x) * 0.001;
        SCRUB.invalidate().restart();
      },
      onDragEnd() {
        scrollToPosition(SCRUB.vars.position);
      },
    });

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    if (nextButton) nextButton.addEventListener('click', NEXT);
    if (prevButton) prevButton.addEventListener('click', PREV);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (boxesElement) {
        boxesElement.removeEventListener('click', handleBoxClick);
      }
      if (nextButton) nextButton.removeEventListener('click', NEXT);
      if (prevButton) prevButton.removeEventListener('click', PREV);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section className="bg-portfolio-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold">Featured Projects</h2>
        </div>

        <div className="boxes relative h-96 overflow-hidden">
          <div className="drag-proxy absolute inset-0 z-10"></div>
          {projects.map((project, index) => (
            <div 
              key={index}
              className="box absolute top-1/2 left-1/2 w-80 h-60 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ display: 'none' }}
            >
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded">
                <span className="text-white font-playfair text-sm">{project.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button className="prev bg-portfolio-gold text-black px-6 py-2 rounded hover:bg-white transition-colors">
            Previous
          </button>
          <button className="next bg-portfolio-gold text-black px-6 py-2 rounded hover:bg-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
