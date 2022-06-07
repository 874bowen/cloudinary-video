import {Composition, Img, Audio, Sequence, useVideoConfig, useCurrentFrame, spring} from 'remotion';
import voice from './voice.mp3';
import cloudinary from './cloudinary.png';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Main"
				component={Main}
				durationInFrames={450}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
const Title = () => {
	return(
	<h1
				style={{
					position: 'absolute',
					top: '50%',
					width: '100%',
					textAlign: 'center',
					fontSize: '5rem',
				}}
			><span style={{color: 'burlywood'}}>Welcome </span> <span style={{color: 'darkorange'}}>to</span> <span style={{color: 'deepskyblue'}}>Cloudinary</span></h1>
		);
}
const SubTitle = () => {
	const frame = useCurrentFrame();
	const opacity = frame > 30 ? 1 : frame / 30;
	return(
		<h3
 	style={{
		position: 'absolute',
		top: '60%',
		width: '100%',
		textAlign: 'center',
		fontSize: '3rem',
		opacity
	}}
 >Transform images and videos to load faster with no visual degradation, automatically generate image and video variants, and deliver high quality responsive experiences to increase conversions.</h3>
	);
}

const AudVoice = () => {
	return (
		<Audio src={voice} startFrom={0} endAt={30*15}/>
	);
}

const Image = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const translate = spring({frame, fps, to: 100})
	return(
		<Img
		src={cloudinary} alt='cloudinary'
		style={{
			display: 'block',
			marginLeft: 'auto',
			marginRight: 'auto',
			width: '30%',
			height: '50%',
			transform: `translateY(${translate}px)`
		}}
	/>
	);
}
const Main = () => {
	const {fps, durationInFrames} = useVideoConfig();
	return (
            <div style={{backgroundColor: 'white', flexGrow: 1}}>
                <Sequence from={fps*0.3} durationInFrames={durationInFrames}>
                    <Image />
                </Sequence>
                <Sequence from={fps} durationInFrames={durationInFrames}>
                    <AudVoice />
                </Sequence>
                <Sequence from={fps} durationInFrames={durationInFrames}>
                    <Title />
                </Sequence>
                <Sequence from={fps*2} durationInFrames={durationInFrames}>
                    <SubTitle />
                </Sequence>
		</div>
	);
}