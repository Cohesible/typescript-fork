/// <reference lib="dom" />

// TODO: don't leak these types into ambient scope

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ToggleEvent) */
interface ToggleEvent extends Event {
	readonly newState: string;
	readonly oldState: string;
}

declare var ToggleEvent: {
	prototype: ToggleEvent;
	new (type: string, eventInitDict?: ToggleEventInit): ToggleEvent;
};

interface ToggleEventInit extends EventInit {
	newState?: string;
	oldState?: string;
}

/** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/CommandEvent) */
interface CommandEvent extends Event {
	readonly source: Element | null;
	readonly command: string;
}

declare var CommandEvent: {
	prototype: CommandEvent;
	new (type: string, eventInitDict?: CommandEventInit): CommandEvent;
};

interface CommandEventInit extends EventInit {
	source: Element | null;
	command: string;
}

/** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/SnapEvent) */
interface SnapEvent extends Event {
	readonly snapTargetBlock: Element | null;
	readonly snapTargetInline: Element | null;
}

declare var SnapEvent: {
	prototype: SnapEvent;
	new (type: string, eventInitDict?: SnapEventInit): SnapEvent;
}

interface SnapEventInit extends EventInit {
	snapTargetBlock?: Element | null;
	snapTargetInline?: Element | null;
}

interface SymbolConstructor {
    readonly update: unique symbol;
}

interface Updatable {
	[Symbol.update](): void
}

interface Element {
	[Symbol.update]?(): void
}

// global { interface Element { [Symbol.update]: (() => void) | undefined } }

declare namespace JSX {
	type Booleanish = boolean | 'true' | 'false';

	type Child = string | number | ChildNode;
	type Children = (string | number | ChildNode)[];

	type Element = globalThis.Element;

	type ScopedStylesheet = any; // TODO

	// ============================================
	// Event Types
	// ============================================

	type TargetedEvent<
		Target extends EventTarget = EventTarget,
		TypedEvent extends Event = Event
	> = Omit<TypedEvent, 'currentTarget'> & {
		readonly currentTarget: Target;
	};

	type EventHandler<T extends EventTarget, E extends Event> = {
		bivarianceHack(event: TargetedEvent<T, E>): void;
	}['bivarianceHack'];

	type AnimationEventHandler<Target extends EventTarget> =
		EventHandler<Target, AnimationEvent>;
	type ClipboardEventHandler<Target extends EventTarget> =
		EventHandler<Target, ClipboardEvent>;
	type CommandEventHandler<Target extends EventTarget> =
		EventHandler<Target, CommandEvent>;
	type CompositionEventHandler<Target extends EventTarget> =
		EventHandler<Target, CompositionEvent>;
	type DragEventHandler<Target extends EventTarget> =
		EventHandler<Target, DragEvent>;
	type ToggleEventHandler<Target extends EventTarget> =
		EventHandler<Target, ToggleEvent>;
	type FocusEventHandler<Target extends EventTarget> =
		EventHandler<Target, FocusEvent>;
	type GenericEventHandler<Target extends EventTarget> =
		EventHandler<Target, Event>;
	type InputEventHandler<Target extends EventTarget> =
		EventHandler<Target, InputEvent>;
	type KeyboardEventHandler<Target extends EventTarget> =
		EventHandler<Target, KeyboardEvent>;
	type MouseEventHandler<Target extends EventTarget> =
		EventHandler<Target, MouseEvent>;
	type PointerEventHandler<Target extends EventTarget> =
		EventHandler<Target, PointerEvent>;
	type SnapEventHandler<Target extends EventTarget> =
		EventHandler<Target, SnapEvent>;
	type SubmitEventHandler<Target extends EventTarget> =
		EventHandler<Target, SubmitEvent>;
	type TouchEventHandler<Target extends EventTarget> =
		EventHandler<Target, TouchEvent>;
	type TransitionEventHandler<Target extends EventTarget> =
		EventHandler<Target, TransitionEvent>;
	type UIEventHandler<Target extends EventTarget> =
		EventHandler<Target, UIEvent>;
	type WheelEventHandler<Target extends EventTarget> =
		EventHandler<Target, WheelEvent>;
	type PictureInPictureEventHandler<Target extends EventTarget> =
		EventHandler<Target, PictureInPictureEvent>;

	// ============================================
	// DOM Attributes (Event Handlers)
	// ============================================

	interface DOMAttributes<Target extends EventTarget> {
		children?: Children;
		[key: `prop:${string}`]: unknown;
		[key: `style:${string}`]: string | number; // emits as `.style.setProperty`

		// Image Events
		"on:load"?: GenericEventHandler<Target>;
		"on:error"?: GenericEventHandler<Target>;

		// Clipboard Events
		"on:copy"?: ClipboardEventHandler<Target>;
		"on:cut"?: ClipboardEventHandler<Target>;
		"on:paste"?: ClipboardEventHandler<Target>;

		// Composition Events
		"on:compositionend"?: CompositionEventHandler<Target>;
		"on:compositionstart"?: CompositionEventHandler<Target>;
		"on:compositionupdate"?: CompositionEventHandler<Target>;

		// Popover Events
		"on:beforetoggle"?: ToggleEventHandler<Target>;
		"on:toggle"?: ToggleEventHandler<Target>;

		// Dialog Events
		"on:close"?: GenericEventHandler<Target>;
		"on:cancel"?: GenericEventHandler<Target>;

		// Focus Events
		"on:focus"?: FocusEventHandler<Target>;
		"on:focusin"?: FocusEventHandler<Target>;
		"on:focusout"?: FocusEventHandler<Target>;
		"on:blur"?: FocusEventHandler<Target>;

		// Form Events
		"on:change"?: GenericEventHandler<Target>;
		"on:input"?: InputEventHandler<Target>;
		"on:beforeinput"?: InputEventHandler<Target>;
		"on:search"?: GenericEventHandler<Target>;
		"on:submit"?: SubmitEventHandler<Target>;
		"on:invalid"?: GenericEventHandler<Target>;
		"on:reset"?: GenericEventHandler<Target>;
		"on:formdata"?: GenericEventHandler<Target>;

		// Keyboard Events
		"on:keydown"?: KeyboardEventHandler<Target>;
		"on:keypress"?: KeyboardEventHandler<Target>;
		"on:keyup"?: KeyboardEventHandler<Target>;

		// Media Events
		"on:abort"?: GenericEventHandler<Target>;
		"on:canplay"?: GenericEventHandler<Target>;
		"on:canplaythrough"?: GenericEventHandler<Target>;
		"on:durationchange"?: GenericEventHandler<Target>;
		"on:emptied"?: GenericEventHandler<Target>;
		"on:encrypted"?: GenericEventHandler<Target>;
		"on:ended"?: GenericEventHandler<Target>;
		"on:loadeddata"?: GenericEventHandler<Target>;
		"on:loadedmetadata"?: GenericEventHandler<Target>;
		"on:loadstart"?: GenericEventHandler<Target>;
		"on:pause"?: GenericEventHandler<Target>;
		"on:play"?: GenericEventHandler<Target>;
		"on:playing"?: GenericEventHandler<Target>;
		"on:progress"?: GenericEventHandler<Target>;
		"on:ratechange"?: GenericEventHandler<Target>;
		"on:seeked"?: GenericEventHandler<Target>;
		"on:seeking"?: GenericEventHandler<Target>;
		"on:stalled"?: GenericEventHandler<Target>;
		"on:suspend"?: GenericEventHandler<Target>;
		"on:timeupdate"?: GenericEventHandler<Target>;
		"on:volumechange"?: GenericEventHandler<Target>;
		"on:waiting"?: GenericEventHandler<Target>;

		// MouseEvents
		"on:click"?: MouseEventHandler<Target>;

		"on:contextmenu"?: MouseEventHandler<Target>;
		"on:dblclick"?: MouseEventHandler<Target>;
		"on:drag"?: DragEventHandler<Target>;
		"on:dragend"?: DragEventHandler<Target>;
		"on:dragenter"?: DragEventHandler<Target>;
		"on:dragexit"?: DragEventHandler<Target>;
		"on:dragleave"?: DragEventHandler<Target>;
		"on:dragover"?: DragEventHandler<Target>;
		"on:dragstart"?: DragEventHandler<Target>;
		"on:drop"?: DragEventHandler<Target>;
		"on:mousedown"?: MouseEventHandler<Target>;
		"on:mouseenter"?: MouseEventHandler<Target>;
		"on:mouseleave"?: MouseEventHandler<Target>;
		"on:mousemove"?: MouseEventHandler<Target>;
		"on:mouseout"?: MouseEventHandler<Target>;
		"on:mouseover"?: MouseEventHandler<Target>;
		"on:mouseup"?: MouseEventHandler<Target>;
		"on:auxclick"?: MouseEventHandler<Target>;

		// Selection Events
		"on:select"?: GenericEventHandler<Target>;

		// Touch Events
		"on:touchcancel"?: TouchEventHandler<Target>;
		"on:touchend"?: TouchEventHandler<Target>;
		"on:touchmove"?: TouchEventHandler<Target>;
		"on:touchstart"?: TouchEventHandler<Target>;

		// Pointer Events
		"on:pointerover"?: PointerEventHandler<Target>;
		"on:pointerenter"?: PointerEventHandler<Target>;
		"on:pointerdown"?: PointerEventHandler<Target>;
		"on:pointermove"?: PointerEventHandler<Target>;
		"on:pointerup"?: PointerEventHandler<Target>;
		"on:pointercancel"?: PointerEventHandler<Target>;
		"on:pointerout"?: PointerEventHandler<Target>;
		"on:pointerleave"?: PointerEventHandler<Target>;

		// Scroll Events
		"on:scroll"?: GenericEventHandler<Target>;
		"on:scrollend"?: GenericEventHandler<Target>;
		"on:scrollsnapchange"?: SnapEventHandler<Target>;
		"on:scrollsnapchanging"?: SnapEventHandler<Target>;

		// Wheel Events
		"on:wheel"?: WheelEventHandler<Target>;

		// Animation Events
		"on:animationstart"?: AnimationEventHandler<Target>;
		"on:animationend"?: AnimationEventHandler<Target>;
		"on:animationiteration"?: AnimationEventHandler<Target>;

		// Transition Events
		"on:transitioncancel"?: TransitionEventHandler<Target>;
		"on:transitionend"?: TransitionEventHandler<Target>;
		"on:transitionrun"?: TransitionEventHandler<Target>;
		"on:transitionstart"?: TransitionEventHandler<Target>;

		// PictureInPicture Events
		"on:enterpictureinpicture"?: PictureInPictureEventHandler<Target>;
		"on:leavepictureinpicture"?: PictureInPictureEventHandler<Target>;
		"on:resize"?: PictureInPictureEventHandler<Target>;

		"on:command"?: CommandEventHandler<Target>;
	}

	// ============================================
	// ARIA Attributes
	// ============================================

	interface AriaAttributes {
		'aria-activedescendant'?: string;
		'aria-atomic'?: Booleanish;
		'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
		'aria-braillelabel'?: string;
		'aria-brailleroledescription'?: string;
		'aria-busy'?: Booleanish;
		'aria-checked'?: Booleanish | 'mixed';
		'aria-colcount'?: number;
		'aria-colindex'?: number;
		'aria-colindextext'?: string;
		'aria-colspan'?: number;
		'aria-controls'?: string;
		'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time';
		'aria-describedby'?: string;
		'aria-description'?: string;
		'aria-details'?: string;
		'aria-disabled'?: Booleanish;
		'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
		'aria-errormessage'?: string;
		'aria-expanded'?: Booleanish;
		'aria-flowto'?: string;
		'aria-grabbed'?: Booleanish;
		'aria-haspopup'?: Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
		'aria-hidden'?: Booleanish;
		'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
		'aria-keyshortcuts'?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-level'?: number;
		'aria-live'?: 'off' | 'assertive' | 'polite';
		'aria-modal'?: Booleanish;
		'aria-multiline'?: Booleanish;
		'aria-multiselectable'?: Booleanish;
		'aria-orientation'?: 'horizontal' | 'vertical';
		'aria-owns'?: string;
		'aria-placeholder'?: string;
		'aria-posinset'?: number;
		'aria-pressed'?: Booleanish | 'mixed';
		'aria-readonly'?: Booleanish;
		'aria-relevant'?:
			| 'additions'
			| 'additions removals'
			| 'additions text'
			| 'all'
			| 'removals'
			| 'removals additions'
			| 'removals text'
			| 'text'
			| 'text additions'
			| 'text removals';
		'aria-required'?: Booleanish;
		'aria-roledescription'?: string;
		'aria-rowcount'?: number;
		'aria-rowindex'?: number;
		'aria-rowindextext'?: string;
		'aria-rowspan'?: number;
		'aria-selected'?: Booleanish;
		'aria-setsize'?: number;
		'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
		'aria-valuemax'?: number;
		'aria-valuemin'?: number;
		'aria-valuenow'?: number;
		'aria-valuetext'?: string;
	}

	// WAI-ARIA 1.2 role attribute values
	type WAIAriaRole =
		| 'alert'
		| 'alertdialog'
		| 'application'
		| 'article'
		| 'banner'
		| 'blockquote'
		| 'button'
		| 'caption'
		| 'cell'
		| 'checkbox'
		| 'code'
		| 'columnheader'
		| 'combobox'
		| 'command'
		| 'complementary'
		| 'composite'
		| 'contentinfo'
		| 'definition'
		| 'deletion'
		| 'dialog'
		| 'directory'
		| 'document'
		| 'emphasis'
		| 'feed'
		| 'figure'
		| 'form'
		| 'grid'
		| 'gridcell'
		| 'group'
		| 'heading'
		| 'img'
		| 'input'
		| 'insertion'
		| 'landmark'
		| 'link'
		| 'list'
		| 'listbox'
		| 'listitem'
		| 'log'
		| 'main'
		| 'marquee'
		| 'math'
		| 'meter'
		| 'menu'
		| 'menubar'
		| 'menuitem'
		| 'menuitemcheckbox'
		| 'menuitemradio'
		| 'navigation'
		| 'none'
		| 'note'
		| 'option'
		| 'paragraph'
		| 'presentation'
		| 'progressbar'
		| 'radio'
		| 'radiogroup'
		| 'range'
		| 'region'
		| 'roletype'
		| 'row'
		| 'rowgroup'
		| 'rowheader'
		| 'scrollbar'
		| 'search'
		| 'searchbox'
		| 'section'
		| 'sectionhead'
		| 'select'
		| 'separator'
		| 'slider'
		| 'spinbutton'
		| 'status'
		| 'strong'
		| 'structure'
		| 'subscript'
		| 'superscript'
		| 'switch'
		| 'tab'
		| 'table'
		| 'tablist'
		| 'tabpanel'
		| 'term'
		| 'textbox'
		| 'time'
		| 'timer'
		| 'toolbar'
		| 'tooltip'
		| 'tree'
		| 'treegrid'
		| 'treeitem'
		| 'widget'
		| 'window'
		| 'none presentation';

	type DPubAriaRole =
		| 'doc-abstract'
		| 'doc-acknowledgments'
		| 'doc-afterword'
		| 'doc-appendix'
		| 'doc-backlink'
		| 'doc-biblioentry'
		| 'doc-bibliography'
		| 'doc-biblioref'
		| 'doc-chapter'
		| 'doc-colophon'
		| 'doc-conclusion'
		| 'doc-cover'
		| 'doc-credit'
		| 'doc-credits'
		| 'doc-dedication'
		| 'doc-endnote'
		| 'doc-endnotes'
		| 'doc-epigraph'
		| 'doc-epilogue'
		| 'doc-errata'
		| 'doc-example'
		| 'doc-footnote'
		| 'doc-foreword'
		| 'doc-glossary'
		| 'doc-glossref'
		| 'doc-index'
		| 'doc-introduction'
		| 'doc-noteref'
		| 'doc-notice'
		| 'doc-pagebreak'
		| 'doc-pagelist'
		| 'doc-part'
		| 'doc-preface'
		| 'doc-prologue'
		| 'doc-pullquote'
		| 'doc-qna'
		| 'doc-subtitle'
		| 'doc-tip'
		| 'doc-toc';

	type AriaRole = WAIAriaRole | DPubAriaRole;

	// ============================================
	// HTML Attributes
	// ============================================

	interface HTMLAttributes<RefType extends EventTarget = EventTarget>
		extends DOMAttributes<RefType>,
			AriaAttributes {
		// Standard HTML Attributes
		accesskey?: string;
		autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
		autocorrect?: string;
		autofocus?: boolean;
		class?: string;
		contenteditable?: Booleanish | '' | 'plaintext-only' | 'inherit';
		dir?: 'auto' | 'rtl' | 'ltr';
		draggable?: boolean;
		enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
		exportparts?: string;
		hidden?: boolean | 'hidden' | 'until-found';
		id?: string;
		inert?: boolean;
		inputmode?: string;
		is?: string;
		lang?: string;
		nonce?: string;
		part?: string;
		popover?: 'auto' | 'hint' | 'manual' | boolean;
		slot?: string;
		spellcheck?: boolean;
		style?: string;
		tabindex?: number;
		title?: string;
		translate?: boolean;

		// WAI-ARIA Attributes
		role?: AriaRole;

		// Non-standard Attributes
		disablePictureInPicture?: boolean;
		elementtiming?: string;
		results?: number;

		// RDFa Attributes
		about?: string;
		datatype?: string;
		inlist?: string;
		prefix?: string;
		property?: string;
		resource?: string;
		typeof?: string;
		vocab?: string;

		// Microdata Attributes
		itemid?: string;
		itemprop?: string;
		itemref?: string;
		itemscope?: boolean;
		itemtype?: string;
	}

	type HTMLAttributeReferrerPolicy =
		| ''
		| 'no-referrer'
		| 'no-referrer-when-downgrade'
		| 'origin'
		| 'origin-when-cross-origin'
		| 'same-origin'
		| 'strict-origin'
		| 'strict-origin-when-cross-origin'
		| 'unsafe-url';

	type HTMLAttributeAnchorTarget = '_self' | '_blank' | '_parent' | '_top' | string;
	type HTMLAttributeCrossOrigin = 'anonymous' | 'use-credentials';

	// ============================================
	// Element-Specific HTML Attributes
	// ============================================

	interface AnchorHTMLAttributes<T extends EventTarget = HTMLAnchorElement>
		extends HTMLAttributes<T> {
		download?: string;
		href?: string;
		hreflang?: string;
		media?: string;
		ping?: string;
		rel?: string;
		target?: HTMLAttributeAnchorTarget;
		type?: string;
		referrerpolicy?: HTMLAttributeReferrerPolicy;
	}

	interface AreaHTMLAttributes<T extends EventTarget = HTMLAreaElement>
		extends HTMLAttributes<T> {
		alt?: string;
		coords?: string;
		download?: string;
		href?: string;
		hreflang?: string;
		media?: string;
		referrerpolicy?: HTMLAttributeReferrerPolicy;
		rel?: string;
		shape?: string;
		target?: HTMLAttributeAnchorTarget;
	}

	interface AudioHTMLAttributes<T extends EventTarget = HTMLAudioElement>
		extends MediaHTMLAttributes<T> {}

	interface BaseHTMLAttributes<T extends EventTarget = HTMLBaseElement>
		extends HTMLAttributes<T> {
		href?: string;
		target?: HTMLAttributeAnchorTarget;
	}

	interface BlockquoteHTMLAttributes<T extends EventTarget = HTMLQuoteElement>
		extends HTMLAttributes<T> {
		cite?: string;
	}

	interface ButtonHTMLAttributes<T extends EventTarget = HTMLButtonElement>
		extends HTMLAttributes<T> {
		command?: string;
		commandfor?: string;
		disabled?: boolean;
		form?: string;
		formaction?: string;
		formenctype?: string;
		formmethod?: string;
		formnovalidate?: boolean;
		formtarget?: string;
		name?: string;
		popovertarget?: string;
		popovertargetaction?: 'hide' | 'show' | 'toggle';
		type?: 'submit' | 'reset' | 'button';
		value?: string | number;
	}

	interface CanvasHTMLAttributes<T extends EventTarget = HTMLCanvasElement>
		extends HTMLAttributes<T> {
		height?: number | string;
		width?: number | string;
	}

	interface ColHTMLAttributes<T extends EventTarget = HTMLTableColElement>
		extends HTMLAttributes<T> {
		span?: number;
		width?: number | string;
	}

	interface ColgroupHTMLAttributes<T extends EventTarget = HTMLTableColElement>
		extends HTMLAttributes<T> {
		span?: number;
	}

	interface DataHTMLAttributes<T extends EventTarget = HTMLDataElement>
		extends HTMLAttributes<T> {
		value?: string | number;
	}

	interface DelHTMLAttributes<T extends EventTarget = HTMLModElement>
		extends HTMLAttributes<T> {
		cite?: string;
		datetime?: string;
	}

	interface DetailsHTMLAttributes<T extends EventTarget = HTMLDetailsElement>
		extends HTMLAttributes<T> {
		name?: string;
		open?: boolean;
	}

	interface DialogHTMLAttributes<T extends EventTarget = HTMLDialogElement>
		extends HTMLAttributes<T> {
		"on:cancel"?: GenericEventHandler<T>;
		"on:close"?: GenericEventHandler<T>;
		open?: boolean;
		closedby?: 'none' | 'closerequest' | 'any';
	}

	interface EmbedHTMLAttributes<T extends EventTarget = HTMLEmbedElement>
		extends HTMLAttributes<T> {
		height?: number | string;
		src?: string;
		type?: string;
		width?: number | string;
	}

	interface FieldsetHTMLAttributes<T extends EventTarget = HTMLFieldSetElement>
		extends HTMLAttributes<T> {
		disabled?: boolean;
		form?: string;
		name?: string;
	}

	interface FormHTMLAttributes<T extends EventTarget = HTMLFormElement>
		extends HTMLAttributes<T> {
		'accept-charset'?: string;
		action?: string;
		autocomplete?: string;
		enctype?: string;
		method?: string;
		name?: string;
		novalidate?: boolean;
		rel?: string; // reflected to relList DOMTokenList
		target?: string;
	}

	interface IframeHTMLAttributes<T extends EventTarget = HTMLIFrameElement>
		extends HTMLAttributes<T> {
		allow?: string;
		allowFullScreen?: boolean;
		frameborder?: number | string;
		height?: number | string;
		loading?: 'eager' | 'lazy';
		marginHeight?: number;
		marginWidth?: number;
		name?: string;
		referrerpolicy?: HTMLAttributeReferrerPolicy;
		sandbox?: string;
		scrolling?: string;
		seamless?: boolean;
		src?: string;
		srcdoc?: string;
		width?: number | string;
	}

	interface ImgHTMLAttributes<T extends EventTarget = HTMLImageElement>
		extends HTMLAttributes<T> {
		alt?: string;
		crossorigin?: HTMLAttributeCrossOrigin;
		decoding?: 'async' | 'auto' | 'sync';
		fetchpriority?: 'high' | 'auto' | 'low';
		height?: number | string;
		loading?: 'eager' | 'lazy';
		referrerpolicy?: HTMLAttributeReferrerPolicy;
		sizes?: string;
		src?: string;
		srcset?: string;
		usemap?: string;
		width?: number | string;
	}

	type HTMLInputTypeAttribute =
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| string;

	interface InputHTMLAttributes<T extends EventTarget = HTMLInputElement>
		extends HTMLAttributes<T> {
		accept?: string;
		alt?: string;
		autocomplete?: string;
		capture?: 'user' | 'environment';
		checked?: boolean;
		defaultChecked?: boolean;
		defaultValue?: string | number;
		disabled?: boolean;
		enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
		form?: string;
		formaction?: string;
		formenctype?: string;
		formmethod?: string;
		formnovalidate?: boolean;
		formtarget?: string;
		height?: number | string;
		indeterminate?: boolean;
		list?: string;
		max?: number | string;
		maxlength?: number;
		min?: number | string;
		minlength?: number;
		multiple?: boolean;
		name?: string;
		pattern?: string;
		placeholder?: string;
		readonly?: boolean;
		required?: boolean;
		size?: number;
		src?: string;
		step?: number | string;
		type?: HTMLInputTypeAttribute;
		value?: string | number;
		width?: number | string;
		"on:change"?: GenericEventHandler<T>;
	}

	interface InsHTMLAttributes<T extends EventTarget = HTMLModElement>
		extends HTMLAttributes<T> {
		cite?: string;
		datetime?: string;
	}

	interface LabelHTMLAttributes<T extends EventTarget = HTMLLabelElement>
		extends HTMLAttributes<T> {
		for?: string;
		form?: string;
	}

	interface LiHTMLAttributes<T extends EventTarget = HTMLLIElement>
		extends HTMLAttributes<T> {
		value?: string | number;
	}

	interface LinkHTMLAttributes<T extends EventTarget = HTMLLinkElement>
		extends HTMLAttributes<T> {
		as?: string;
		crossorigin?: HTMLAttributeCrossOrigin;
		fetchpriority?: 'high' | 'low' | 'auto';
		href?: string;
		hreflang?: string;
		integrity?: string;
		media?: string;
		imagesrcset?: string;
		referrerpolicy?: HTMLAttributeReferrerPolicy;
		rel?: string;
		sizes?: string;
		type?: string;
		charset?: string;
	}

	interface MapHTMLAttributes<T extends EventTarget = HTMLMapElement>
		extends HTMLAttributes<T> {
		name?: string;
	}

	interface MediaHTMLAttributes<T extends EventTarget = HTMLMediaElement>
		extends HTMLAttributes<T> {
		autoplay?: boolean;
		controls?: boolean;
		controlslist?: string;
		crossorigin?: HTMLAttributeCrossOrigin;
		currentTime?: number;
		defaultMuted?: boolean;
		defaultPlaybackRate?: number;
		disableremoteplayback?: boolean;
		loop?: boolean;
		mediaGroup?: string;
		muted?: boolean;
		playbackRate?: number;
		preload?: 'auto' | 'metadata' | 'none';
		preservesPitch?: boolean;
		src?: string;
		srcObject?: MediaStream | MediaSource | Blob | File | null;
		volume?: string | number;
	}

	interface MenuHTMLAttributes<T extends EventTarget = HTMLMenuElement>
		extends HTMLAttributes<T> {
		type?: string;
	}

	interface MetaHTMLAttributes<T extends EventTarget = HTMLMetaElement>
		extends HTMLAttributes<T> {
		charset?: string;
		content?: string;
		'http-equiv'?: string;
		name?: string;
		media?: string;
	}

	interface MeterHTMLAttributes<T extends EventTarget = HTMLMeterElement>
		extends HTMLAttributes<T> {
		form?: string;
		high?: number;
		low?: number;
		max?: number | string;
		min?: number | string;
		optimum?: number;
		value?: string | number;
	}

	interface ObjectHTMLAttributes<T extends EventTarget = HTMLObjectElement>
		extends HTMLAttributes<T> {
		classid?: string;
		data?: string;
		form?: string;
		height?: number | string;
		name?: string;
		type?: string;
		usemap?: string;
		width?: number | string;
		wmode?: string;
	}

	interface OlHTMLAttributes<T extends EventTarget = HTMLOListElement>
		extends HTMLAttributes<T> {
		reversed?: boolean;
		start?: number;
		type?: '1' | 'a' | 'A' | 'i' | 'I';
	}

	interface OptgroupHTMLAttributes<T extends EventTarget = HTMLOptGroupElement>
		extends HTMLAttributes<T> {
		disabled?: boolean;
		label?: string;
	}

	interface OptionHTMLAttributes<T extends EventTarget = HTMLOptionElement>
		extends HTMLAttributes<T> {
		disabled?: boolean;
		label?: string;
		selected?: boolean;
		value?: string | number;
	}

	interface OutputHTMLAttributes<T extends EventTarget = HTMLOutputElement>
		extends HTMLAttributes<T> {
		for?: string;
		form?: string;
		name?: string;
	}

	interface ProgressHTMLAttributes<T extends EventTarget = HTMLProgressElement>
		extends HTMLAttributes<T> {
		max?: number | string;
		value?: string | number;
	}

	interface QuoteHTMLAttributes<T extends EventTarget = HTMLQuoteElement>
		extends HTMLAttributes<T> {
		cite?: string;
	}

	interface ScriptHTMLAttributes<T extends EventTarget = HTMLScriptElement>
		extends HTMLAttributes<T> {
		async?: boolean;
		charset?: string;
		crossorigin?: HTMLAttributeCrossOrigin;
		defer?: boolean;
		integrity?: string;
		nomodule?: boolean;
		referrerpolicy?: HTMLAttributeReferrerPolicy;
		src?: string;
		type?: string;
	}

	interface SelectHTMLAttributes<T extends EventTarget = HTMLSelectElement>
		extends HTMLAttributes<T> {
		autocomplete?: string;
		defaultValue?: string | number;
		disabled?: boolean;
		form?: string;
		multiple?: boolean;
		name?: string;
		required?: boolean;
		size?: number;
		value?: string | number;
		"on:change"?: GenericEventHandler<T>;
	}

	interface SlotHTMLAttributes<T extends EventTarget = HTMLSlotElement>
		extends HTMLAttributes<T> {
		name?: string;
	}

	interface SourceHTMLAttributes<T extends EventTarget = HTMLSourceElement>
		extends HTMLAttributes<T> {
		height?: number | string;
		media?: string;
		sizes?: string;
		src?: string;
		srcset?: string;
		type?: string;
		width?: number | string;
	}

	interface StyleHTMLAttributes<T extends EventTarget = HTMLStyleElement>
		extends HTMLAttributes<T> {
		media?: string;
		scoped?: boolean;
		type?: string;
	}

	interface TableHTMLAttributes<T extends EventTarget = HTMLTableElement>
		extends HTMLAttributes<T> {
		cellPadding?: string;
		cellSpacing?: string;
		summary?: string;
		width?: number | string;
	}

	interface TdHTMLAttributes<T extends EventTarget = HTMLTableCellElement>
		extends HTMLAttributes<T> {
		align?: 'left' | 'center' | 'right' | 'justify' | 'char';
		colspan?: number;
		headers?: string;
		rowspan?: number;
		scope?: string;
		abbr?: string;
		height?: number | string;
		width?: number | string;
		valign?: 'top' | 'middle' | 'bottom' | 'baseline';
	}

	interface TextareaHTMLAttributes<T extends EventTarget = HTMLTextAreaElement>
		extends HTMLAttributes<T> {
		autocomplete?: string;
		cols?: number;
		defaultValue?: string | number;
		dirName?: string;
		disabled?: boolean;
		form?: string;
		maxlength?: number;
		minlength?: number;
		name?: string;
		placeholder?: string;
		readonly?: boolean;
		required?: boolean;
		rows?: number;
		value?: string | number;
		wrap?: string;
		"on:change"?: GenericEventHandler<T>;
	}

	interface ThHTMLAttributes<T extends EventTarget = HTMLTableCellElement>
		extends HTMLAttributes<T> {
		align?: 'left' | 'center' | 'right' | 'justify' | 'char';
		colspan?: number;
		headers?: string;
		rowspan?: number;
		scope?: string;
		abbr?: string;
	}

	interface TimeHTMLAttributes<T extends EventTarget = HTMLTimeElement>
		extends HTMLAttributes<T> {
		datetime?: string;
	}

	interface TrackHTMLAttributes<T extends EventTarget = HTMLTrackElement>
		extends MediaHTMLAttributes<T> {
		default?: boolean;
		kind?: string;
		label?: string;
		srclang?: string;
	}

	interface VideoHTMLAttributes<T extends EventTarget = HTMLVideoElement>
		extends MediaHTMLAttributes<T> {
		disablePictureInPicture?: boolean;
		height?: number | string;
		playsinline?: boolean;
		playsInline?: boolean;
		poster?: string;
		width?: number | string;
	}

	// ============================================
	// SVG Attributes
	// ============================================

	interface SVGAttributes<Target extends EventTarget = SVGElement>
		extends HTMLAttributes<Target> {
		accentHeight?: number | string;
		accumulate?: 'none' | 'sum';
		additive?: 'replace' | 'sum';
		'alignment-baseline'?:
			| 'auto'
			| 'baseline'
			| 'before-edge'
			| 'text-before-edge'
			| 'middle'
			| 'central'
			| 'after-edge'
			| 'text-after-edge'
			| 'ideographic'
			| 'alphabetic'
			| 'hanging'
			| 'mathematical'
			| 'inherit';
		allowReorder?: 'no' | 'yes';
		alphabetic?: number | string;
		amplitude?: number | string;
		arabicForm?: 'initial' | 'medial' | 'terminal' | 'isolated';
		ascent?: number | string;
		attributeName?: string;
		attributeType?: string;
		azimuth?: number | string;
		baseFrequency?: number | string;
		'baseline-shift'?: number | string;
		baseProfile?: number | string;
		bbox?: number | string;
		begin?: number | string;
		bias?: number | string;
		by?: number | string;
		calcMode?: number | string;
		capHeight?: number | string;
		clip?: number | string;
		'clip-path'?: string;
		clipPathUnits?: number | string;
		'clip-rule'?: number | string;
		'color-interpolation'?: number | string;
		'color-interpolation-filters'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit';
		colorProfile?: number | string;
		colorRendering?: number | string;
		contentScriptType?: number | string;
		contentStyleType?: number | string;
		cursor?: number | string;
		cx?: number | string;
		cy?: number | string;
		d?: string;
		decelerate?: number | string;
		descent?: number | string;
		diffuseConstant?: number | string;
		direction?: number | string;
		display?: number | string;
		divisor?: number | string;
		'dominant-baseline'?: number | string;
		dur?: number | string;
		dx?: number | string;
		dy?: number | string;
		edgeMode?: number | string;
		elevation?: number | string;
		enableBackground?: number | string;
		end?: number | string;
		exponent?: number | string;
		externalResourcesRequired?: number | string;
		fill?: string;
		'fill-opacity'?: number | string;
		'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit';
		filter?: string;
		filterRes?: number | string;
		filterUnits?: number | string;
		'flood-color'?: number | string;
		'flood-opacity'?: number | string;
		focusable?: number | string;
		'font-family'?: string;
		'font-size'?: number | string;
		'font-size-adjust'?: number | string;
		'font-stretch'?: number | string;
		'font-style'?: number | string;
		'font-variant'?: number | string;
		'font-weight'?: number | string;
		format?: number | string;
		from?: number | string;
		fx?: number | string;
		fy?: number | string;
		g1?: number | string;
		g2?: number | string;
		glyphName?: number | string;
		glyphOrientationHorizontal?: number | string;
		glyphOrientationVertical?: number | string;
		glyphRef?: number | string;
		gradientTransform?: string;
		gradientUnits?: string;
		hanging?: number | string;
		height?: number | string;
		horizAdvX?: number | string;
		horizOriginX?: number | string;
		href?: string;
		hreflang?: string;
		ideographic?: number | string;
		'image-rendering'?: number | string;
		in2?: number | string;
		in?: string;
		intercept?: number | string;
		k1?: number | string;
		k2?: number | string;
		k3?: number | string;
		k4?: number | string;
		k?: number | string;
		kernelMatrix?: number | string;
		kernelUnitLength?: number | string;
		kerning?: number | string;
		keyPoints?: number | string;
		keySplines?: number | string;
		keyTimes?: number | string;
		lengthAdjust?: number | string;
		'letter-spacing'?: number | string;
		'lighting-color'?: number | string;
		limitingConeAngle?: number | string;
		local?: number | string;
		'marker-end'?: string;
		markerHeight?: number | string;
		'marker-mid'?: string;
		'marker-start'?: string;
		markerUnits?: number | string;
		markerWidth?: number | string;
		mask?: string;
		maskContentUnits?: number | string;
		maskUnits?: number | string;
		mathematical?: number | string;
		mode?: number | string;
		numOctaves?: number | string;
		offset?: number | string;
		opacity?: number | string;
		operator?: number | string;
		order?: number | string;
		orient?: number | string;
		orientation?: number | string;
		origin?: number | string;
		overflow?: number | string;
		overlinePosition?: number | string;
		overlineThickness?: number | string;
		'paint-order'?: number | string;
		panose1?: number | string;
		pathLength?: number | string;
		patternContentUnits?: string;
		patternTransform?: number | string;
		patternUnits?: string;
		'pointer-events'?: number | string;
		points?: string;
		pointsAtX?: number | string;
		pointsAtY?: number | string;
		pointsAtZ?: number | string;
		preserveAlpha?: number | string;
		preserveAspectRatio?: string;
		primitiveUnits?: number | string;
		r?: number | string;
		radius?: number | string;
		refX?: number | string;
		refY?: number | string;
		renderingIntent?: number | string;
		repeatCount?: number | string;
		repeatDur?: number | string;
		requiredExtensions?: number | string;
		requiredFeatures?: number | string;
		restart?: number | string;
		result?: string;
		rotate?: number | string;
		rx?: number | string;
		ry?: number | string;
		scale?: number | string;
		seed?: number | string;
		'shape-rendering'?: number | string;
		slope?: number | string;
		spacing?: number | string;
		specularConstant?: number | string;
		specularExponent?: number | string;
		speed?: number | string;
		spreadMethod?: string;
		startOffset?: number | string;
		stdDeviation?: number | string;
		stemh?: number | string;
		stemv?: number | string;
		stitchTiles?: number | string;
		'stop-color'?: string;
		'stop-opacity'?: number | string;
		strikethroughPosition?: number | string;
		strikethroughThickness?: number | string;
		string?: number | string;
		stroke?: string;
		'stroke-dasharray'?: string | number;
		'stroke-dashoffset'?: string | number;
		'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit';
		'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit';
		'stroke-miterlimit'?: string | number;
		'stroke-opacity'?: number | string;
		'stroke-width'?: number | string;
		surfaceScale?: number | string;
		systemLanguage?: number | string;
		tableValues?: number | string;
		targetX?: number | string;
		targetY?: number | string;
		'text-anchor'?: string;
		'text-decoration'?: number | string;
		textLength?: number | string;
		'text-rendering'?: number | string;
		to?: number | string;
		transform?: string;
		'transform-origin'?: string;
		type?: string;
		u1?: number | string;
		u2?: number | string;
		underlinePosition?: number | string;
		underlineThickness?: number | string;
		unicode?: number | string;
		'unicode-bidi'?: number | string;
		unicodeRange?: number | string;
		unitsPerEm?: number | string;
		vAlphabetic?: number | string;
		values?: string;
		'vector-effect'?: number | string;
		version?: string;
		vertAdvY?: number | string;
		vertOriginX?: number | string;
		vertOriginY?: number | string;
		vHanging?: number | string;
		vIdeographic?: number | string;
		viewBox?: string;
		viewTarget?: number | string;
		visibility?: number | string;
		vMathematical?: number | string;
		width?: number | string;
		'word-spacing'?: number | string;
		'writing-mode'?: number | string;
		x1?: number | string;
		x2?: number | string;
		x?: number | string;
		xChannelSelector?: string;
		xHeight?: number | string;
		'xlink:actuate'?: string;
		'xlink:arcrole'?: string;
		'xlink:href'?: string;
		'xlink:role'?: string;
		'xlink:show'?: string;
		'xlink:title'?: string;
		'xlink:type'?: string;
		'xml:base'?: string;
		'xml:lang'?: string;
		xmlns?: string;
		xmlnsXlink?: string;
		'xml:space'?: string;
		y1?: number | string;
		y2?: number | string;
		y?: number | string;
		yChannelSelector?: string;
		z?: number | string;
		zoomAndPan?: string;
	}

	interface PathAttributes {
		d: string;
	}

	// ============================================
	// MathML Attributes
	// ============================================

	interface MathMLAttributes<Target extends EventTarget = MathMLElement>
		extends HTMLAttributes<Target> {
		dir?: 'ltr' | 'rtl';
		displaystyle?: boolean;
		href?: string;
		mathbackground?: string;
		mathcolor?: string;
		mathsize?: string;
		nonce?: string;
		scriptlevel?: string;
	}

	interface AnnotationMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		encoding?: string;
		src?: string;
	}

	interface AnnotationXmlMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		encoding?: string;
		src?: string;
	}

	interface MActionMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		actiontype?: 'statusline' | 'toggle';
		selection?: string;
	}

	interface MathMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		display?: 'block' | 'inline';
	}

	interface MEncloseMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		notation?: string;
	}

	interface MErrorMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	interface MFencedMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		close?: string;
		open?: string;
		separators?: string;
	}

	interface MFracMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		denomalign?: 'center' | 'left' | 'right';
		linethickness?: string;
		numalign?: 'center' | 'left' | 'right';
	}

	interface MiMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		mathvariant?:
			| 'normal'
			| 'bold'
			| 'italic'
			| 'bold-italic'
			| 'double-struck'
			| 'bold-fraktur'
			| 'script'
			| 'bold-script'
			| 'fraktur'
			| 'sans-serif'
			| 'bold-sans-serif'
			| 'sans-serif-italic'
			| 'sans-serif-bold-italic'
			| 'monospace'
			| 'initial'
			| 'tailed'
			| 'looped'
			| 'stretched';
	}

	interface MmultiScriptsMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		subscriptshift?: string;
		superscriptshift?: string;
	}

	interface MNMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	interface MOMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		accent?: boolean;
		fence?: boolean;
		largeop?: boolean;
		lspace?: string;
		maxsize?: string;
		minsize?: string;
		movablelimits?: boolean;
		rspace?: string;
		separator?: boolean;
		stretchy?: boolean;
		symmetric?: boolean;
	}

	interface MOverMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		accent?: boolean;
	}

	interface MPaddedMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		depth?: string;
		height?: string;
		lspace?: string;
		voffset?: string;
		width?: string;
	}

	interface MPhantomMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	interface MPrescriptsMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	interface MRootMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	interface MRowMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	interface MSMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		lquote?: string;
		rquote?: string;
	}

	interface MSpaceMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		depth?: string;
		height?: string;
		width?: string;
	}

	interface MSqrtMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	interface MStyleMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		background?: string;
		color?: string;
		fontsize?: string;
		fontstyle?: string;
		fontweight?: string;
		scriptminsize?: string;
		scriptsizemultiplier?: string;
	}

	interface MSubMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		subscriptshift?: string;
	}

	interface MSubsupMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		subscriptshift?: string;
		superscriptshift?: string;
	}

	interface MSupMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		superscriptshift?: string;
	}

	interface MTableMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		align?: 'axis' | 'baseline' | 'bottom' | 'center' | 'top';
		columnalign?: 'center' | 'left' | 'right';
		columnlines?: 'dashed' | 'none' | 'solid';
		columnspacing?: string;
		frame?: 'dashed' | 'none' | 'solid';
		framespacing?: string;
		rowalign?: 'axis' | 'baseline' | 'bottom' | 'center' | 'top';
		rowlines?: 'dashed' | 'none' | 'solid';
		rowspacing?: string;
		width?: string;
	}

	interface MTdMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		columnspan?: number;
		rowspan?: number;
		columnalign?: 'center' | 'left' | 'right';
		rowalign?: 'axis' | 'baseline' | 'bottom' | 'center' | 'top';
	}

	interface MTextMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	interface MTrMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		columnalign?: 'center' | 'left' | 'right';
		rowalign?: 'axis' | 'baseline' | 'bottom' | 'center' | 'top';
	}

	interface MUnderMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		accentunder?: boolean;
	}

	interface MUnderoverMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {
		accent?: boolean;
		accentunder?: boolean;
	}

	interface SemanticsMathMLAttributes<T extends EventTarget>
		extends MathMLAttributes<T> {}

	// ============================================
	// Intrinsic Elements
	// ============================================

	interface IntrinsicSVGElements {
		svg: SVGAttributes<SVGSVGElement>;
		animate: SVGAttributes<SVGAnimateElement>;
		circle: SVGAttributes<SVGCircleElement>;
		animateMotion: SVGAttributes<SVGAnimateMotionElement>;
		animateTransform: SVGAttributes<SVGAnimateTransformElement>;
		clipPath: SVGAttributes<SVGClipPathElement>;
		defs: SVGAttributes<SVGDefsElement>;
		desc: SVGAttributes<SVGDescElement>;
		ellipse: SVGAttributes<SVGEllipseElement>;
		feBlend: SVGAttributes<SVGFEBlendElement>;
		feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>;
		feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>;
		feComposite: SVGAttributes<SVGFECompositeElement>;
		feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>;
		feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>;
		feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>;
		feDistantLight: SVGAttributes<SVGFEDistantLightElement>;
		feDropShadow: SVGAttributes<SVGFEDropShadowElement>;
		feFlood: SVGAttributes<SVGFEFloodElement>;
		feFuncA: SVGAttributes<SVGFEFuncAElement>;
		feFuncB: SVGAttributes<SVGFEFuncBElement>;
		feFuncG: SVGAttributes<SVGFEFuncGElement>;
		feFuncR: SVGAttributes<SVGFEFuncRElement>;
		feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>;
		feImage: SVGAttributes<SVGFEImageElement>;
		feMerge: SVGAttributes<SVGFEMergeElement>;
		feMergeNode: SVGAttributes<SVGFEMergeNodeElement>;
		feMorphology: SVGAttributes<SVGFEMorphologyElement>;
		feOffset: SVGAttributes<SVGFEOffsetElement>;
		fePointLight: SVGAttributes<SVGFEPointLightElement>;
		feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>;
		feSpotLight: SVGAttributes<SVGFESpotLightElement>;
		feTile: SVGAttributes<SVGFETileElement>;
		feTurbulence: SVGAttributes<SVGFETurbulenceElement>;
		filter: SVGAttributes<SVGFilterElement>;
		foreignObject: SVGAttributes<SVGForeignObjectElement>;
		g: SVGAttributes<SVGGElement>;
		image: SVGAttributes<SVGImageElement>;
		line: SVGAttributes<SVGLineElement>;
		linearGradient: SVGAttributes<SVGLinearGradientElement>;
		marker: SVGAttributes<SVGMarkerElement>;
		mask: SVGAttributes<SVGMaskElement>;
		metadata: SVGAttributes<SVGMetadataElement>;
		mpath: SVGAttributes<SVGMPathElement>;
		path: SVGAttributes<SVGPathElement>;
		pattern: SVGAttributes<SVGPatternElement>;
		polygon: SVGAttributes<SVGPolygonElement>;
		polyline: SVGAttributes<SVGPolylineElement>;
		radialGradient: SVGAttributes<SVGRadialGradientElement>;
		rect: SVGAttributes<SVGRectElement>;
		set: SVGAttributes<SVGSetElement>;
		stop: SVGAttributes<SVGStopElement>;
		switch: SVGAttributes<SVGSwitchElement>;
		symbol: SVGAttributes<SVGSymbolElement>;
		text: SVGAttributes<SVGTextElement>;
		textPath: SVGAttributes<SVGTextPathElement>;
		tspan: SVGAttributes<SVGTSpanElement>;
		use: SVGAttributes<SVGUseElement>;
		view: SVGAttributes<SVGViewElement>;
	}

	interface IntrinsicMathMLElements {
		annotation: AnnotationMathMLAttributes<MathMLElement>;
		'annotation-xml': AnnotationXmlMathMLAttributes<MathMLElement>;
		maction: MActionMathMLAttributes<MathMLElement>;
		math: MathMathMLAttributes<MathMLElement>;
		menclose: MEncloseMathMLAttributes<MathMLElement>;
		merror: MErrorMathMLAttributes<MathMLElement>;
		mfenced: MFencedMathMLAttributes<MathMLElement>;
		mfrac: MFracMathMLAttributes<MathMLElement>;
		mi: MiMathMLAttributes<MathMLElement>;
		mmultiscripts: MmultiScriptsMathMLAttributes<MathMLElement>;
		mn: MNMathMLAttributes<MathMLElement>;
		mo: MOMathMLAttributes<MathMLElement>;
		mover: MOverMathMLAttributes<MathMLElement>;
		mpadded: MPaddedMathMLAttributes<MathMLElement>;
		mphantom: MPhantomMathMLAttributes<MathMLElement>;
		mprescripts: MPrescriptsMathMLAttributes<MathMLElement>;
		mroot: MRootMathMLAttributes<MathMLElement>;
		mrow: MRowMathMLAttributes<MathMLElement>;
		ms: MSMathMLAttributes<MathMLElement>;
		mspace: MSpaceMathMLAttributes<MathMLElement>;
		msqrt: MSqrtMathMLAttributes<MathMLElement>;
		mstyle: MStyleMathMLAttributes<MathMLElement>;
		msub: MSubMathMLAttributes<MathMLElement>;
		msubsup: MSubsupMathMLAttributes<MathMLElement>;
		msup: MSupMathMLAttributes<MathMLElement>;
		mtable: MTableMathMLAttributes<MathMLElement>;
		mtd: MTdMathMLAttributes<MathMLElement>;
		mtext: MTextMathMLAttributes<MathMLElement>;
		mtr: MTrMathMLAttributes<MathMLElement>;
		munder: MUnderMathMLAttributes<MathMLElement>;
		munderover: MUnderMathMLAttributes<MathMLElement>;
		semantics: SemanticsMathMLAttributes<MathMLElement>;
	}

	interface IntrinsicElements
		extends IntrinsicSVGElements,
			IntrinsicMathMLElements {
		a: AnchorHTMLAttributes<HTMLAnchorElement>;
		abbr: HTMLAttributes<HTMLElement>;
		address: HTMLAttributes<HTMLElement>;
		area: AreaHTMLAttributes<HTMLAreaElement>;
		article: HTMLAttributes<HTMLElement>;
		aside: HTMLAttributes<HTMLElement>;
		audio: AudioHTMLAttributes<HTMLAudioElement>;
		b: HTMLAttributes<HTMLElement>;
		base: BaseHTMLAttributes<HTMLBaseElement>;
		bdi: HTMLAttributes<HTMLElement>;
		bdo: HTMLAttributes<HTMLElement>;
		blockquote: BlockquoteHTMLAttributes<HTMLQuoteElement>;
		body: HTMLAttributes<HTMLBodyElement>;
		br: HTMLAttributes<HTMLBRElement>;
		button: ButtonHTMLAttributes<HTMLButtonElement>;
		canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
		caption: HTMLAttributes<HTMLTableCaptionElement>;
		cite: HTMLAttributes<HTMLElement>;
		code: HTMLAttributes<HTMLElement>;
		col: ColHTMLAttributes<HTMLTableColElement>;
		colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
		data: DataHTMLAttributes<HTMLDataElement>;
		datalist: HTMLAttributes<HTMLDataListElement>;
		dd: HTMLAttributes<HTMLElement>;
		del: DelHTMLAttributes<HTMLModElement>;
		details: DetailsHTMLAttributes<HTMLDetailsElement>;
		dfn: HTMLAttributes<HTMLElement>;
		dialog: DialogHTMLAttributes<HTMLDialogElement>;
		div: HTMLAttributes<HTMLDivElement>;
		dl: HTMLAttributes<HTMLDListElement>;
		dt: HTMLAttributes<HTMLElement>;
		em: HTMLAttributes<HTMLElement>;
		embed: EmbedHTMLAttributes<HTMLEmbedElement>;
		fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
		figcaption: HTMLAttributes<HTMLElement>;
		figure: HTMLAttributes<HTMLElement>;
		footer: HTMLAttributes<HTMLElement>;
		form: FormHTMLAttributes<HTMLFormElement>;
		h1: HTMLAttributes<HTMLHeadingElement>;
		h2: HTMLAttributes<HTMLHeadingElement>;
		h3: HTMLAttributes<HTMLHeadingElement>;
		h4: HTMLAttributes<HTMLHeadingElement>;
		h5: HTMLAttributes<HTMLHeadingElement>;
		h6: HTMLAttributes<HTMLHeadingElement>;
		head: HTMLAttributes<HTMLHeadElement>;
		header: HTMLAttributes<HTMLElement>;
		hgroup: HTMLAttributes<HTMLElement>;
		hr: HTMLAttributes<HTMLHRElement>;
		html: HTMLAttributes<HTMLHtmlElement>;
		i: HTMLAttributes<HTMLElement>;
		iframe: IframeHTMLAttributes<HTMLIFrameElement>;
		img: ImgHTMLAttributes<HTMLImageElement>;
		input: InputHTMLAttributes<HTMLInputElement>;
		ins: InsHTMLAttributes<HTMLModElement>;
		kbd: HTMLAttributes<HTMLElement>;
		label: LabelHTMLAttributes<HTMLLabelElement>;
		legend: HTMLAttributes<HTMLLegendElement>;
		li: LiHTMLAttributes<HTMLLIElement>;
		link: LinkHTMLAttributes<HTMLLinkElement>;
		main: HTMLAttributes<HTMLElement>;
		map: MapHTMLAttributes<HTMLMapElement>;
		mark: HTMLAttributes<HTMLElement>;
		menu: MenuHTMLAttributes<HTMLMenuElement>;
		menuitem: HTMLAttributes<HTMLUnknownElement>;
		meta: MetaHTMLAttributes<HTMLMetaElement>;
		meter: MeterHTMLAttributes<HTMLMeterElement>;
		nav: HTMLAttributes<HTMLElement>;
		noscript: HTMLAttributes<HTMLElement>;
		object: ObjectHTMLAttributes<HTMLObjectElement>;
		ol: OlHTMLAttributes<HTMLOListElement>;
		optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
		option: OptionHTMLAttributes<HTMLOptionElement>;
		output: OutputHTMLAttributes<HTMLOutputElement>;
		p: HTMLAttributes<HTMLParagraphElement>;
		picture: HTMLAttributes<HTMLPictureElement>;
		pre: HTMLAttributes<HTMLPreElement>;
		progress: ProgressHTMLAttributes<HTMLProgressElement>;
		q: QuoteHTMLAttributes<HTMLQuoteElement>;
		rp: HTMLAttributes<HTMLElement>;
		rt: HTMLAttributes<HTMLElement>;
		ruby: HTMLAttributes<HTMLElement>;
		s: HTMLAttributes<HTMLElement>;
		samp: HTMLAttributes<HTMLElement>;
		script: ScriptHTMLAttributes<HTMLScriptElement>;
		search: HTMLAttributes<HTMLElement>;
		section: HTMLAttributes<HTMLElement>;
		select: SelectHTMLAttributes<HTMLSelectElement>;
		slot: SlotHTMLAttributes<HTMLSlotElement>;
		small: HTMLAttributes<HTMLElement>;
		source: SourceHTMLAttributes<HTMLSourceElement>;
		span: HTMLAttributes<HTMLSpanElement>;
		strong: HTMLAttributes<HTMLElement>;
		style: StyleHTMLAttributes<HTMLStyleElement>;
		sub: HTMLAttributes<HTMLElement>;
		summary: HTMLAttributes<HTMLElement>;
		sup: HTMLAttributes<HTMLElement>;
		table: TableHTMLAttributes<HTMLTableElement>;
		tbody: HTMLAttributes<HTMLTableSectionElement>;
		td: TdHTMLAttributes<HTMLTableCellElement>;
		template: HTMLAttributes<HTMLTemplateElement>;
		textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
		tfoot: HTMLAttributes<HTMLTableSectionElement>;
		th: ThHTMLAttributes<HTMLTableCellElement>;
		thead: HTMLAttributes<HTMLTableSectionElement>;
		time: TimeHTMLAttributes<HTMLTimeElement>;
		title: HTMLAttributes<HTMLTitleElement>;
		tr: HTMLAttributes<HTMLTableRowElement>;
		track: TrackHTMLAttributes<HTMLTrackElement>;
		u: HTMLAttributes<HTMLElement>;
		ul: HTMLAttributes<HTMLUListElement>;
		var: HTMLAttributes<HTMLElement>;
		video: VideoHTMLAttributes<HTMLVideoElement>;
		wbr: HTMLAttributes<HTMLElement>;
	}

	type IntrinsicElementResults = HTMLElementTagNameMap
		& Omit<SVGElementTagNameMap, keyof HTMLElementTagNameMap>
		& Omit<MathMLElementTagNameMap, keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap>;

	// empty string means there is no property to reflect to
	type HtmlAttrAliases = {
		'*': {
			'accesskey': 'accessKey';
			'autocapitalize': 'autoCapitalize';
			'autocorrect': 'autoCorrect';
			'autofocus': 'autoFocus';
			'class': 'className',
			'contenteditable': 'contentEditable';
			'elementtiming': 'elementTiming';
			'inputmode': 'inputMode';
			'tabindex': 'tabIndex';
			'itemid': '';
			'itemprop': '';
			'itemref': '';
			'itemscope': '';
			'itemtype': '';
		};
		'a': {
			'hreflang': 'hrefLang';
			'referrerpolicy': 'referrerPolicy';
		};
		'area': {
			'hreflang': 'hrefLang';
			'referrerpolicy': 'referrerPolicy';
		};
		'audio': {
			'autoplay': 'autoPlay';
			'controlslist': 'controlsList';
			'crossorigin': 'crossOrigin';
			'disableremoteplayback': 'disableRemotePlayback';
		};
		'button': {
			'commandfor': 'commandFor';
			'formaction': 'formAction';
			'formenctype': 'formEncType';
			'formmethod': 'formMethod';
			'formnovalidate': 'formNoValidate';
			'formtarget': 'formTarget';
			'popovertarget': 'popoverTarget';
			'popovertargetaction': 'popoverTargetAction';
		};
		'del': {
			'datetime': 'dateTime';
		};
		'dialog': {
			'closedby': 'closedBy';
		};
		'form': {
			'accept-charset': 'acceptCharset';
			'autocomplete': 'autoComplete';
			'novalidate': 'noValidate';
		};
		'iframe': {
			'frameborder': 'frameBorder';
			'referrerpolicy': 'referrerPolicy';
			'srcdoc': 'srcDoc';
		};
		'img': {
			'crossorigin': 'crossOrigin';
			'fetchpriority': 'fetchPriority';
			'referrerpolicy': 'referrerPolicy';
			'srcset': 'srcSet';
			'usemap': 'useMap';
		};
		'input': {
			'autocomplete': 'autoComplete';
			'formaction': 'formAction';
			'formenctype': 'formEncType';
			'formmethod': 'formMethod';
			'formnovalidate': 'formNoValidate';
			'formtarget': 'formTarget';
			'maxlength': 'maxLength';
			'minlength': 'minLength';
			'readonly': 'readOnly';
		};
		'ins': {
			'datetime': 'dateTime';
		};
		'label': {
			'for': 'htmlFor',
		},
		'link': {
			'charset': 'charSet';
			'crossorigin': 'crossOrigin';
			'fetchpriority': 'fetchPriority';
			'hreflang': 'hrefLang';
			'imagesrcset': 'imageSrcset';
			'referrerpolicy': 'referrerPolicy';
		};
		'meta': {
			'charset': 'charSet';
			'http-equiv': 'httpEquiv';
		};
		'object': {
			'usemap': 'useMap';
		};
		'output': {
			'for': 'htmlFor';
		},
		'script': {
			'charset': 'charSet';
			'crossorigin': 'crossOrigin';
			'nomodule': 'noModule';
			'referrerpolicy': 'referrerPolicy';
		};
		'select': {
			'autocomplete': 'autoComplete';
		};
		'source': {
			'srcset': 'srcSet';
		};
		'td': {
			'colspan': 'colSpan';
			'rowspan': 'rowSpan';
		};
		'textarea': {
			'autocomplete': 'autoComplete';
			'maxlength': 'maxLength';
			'minlength': 'minLength';
			'readonly': 'readOnly';
		};
		'th': {
			'colspan': 'colSpan';
			'rowspan': 'rowSpan';
		};
		'time': {
			'datetime': 'dateTime';
		};
		'track': {
			'srclang': 'srcLang';
		};
		'video': {
			'autoplay': 'autoPlay';
			'controlslist': 'controlsList';
			'crossorigin': 'crossOrigin';
			'disableremoteplayback': 'disableRemotePlayback';
		};
	};
}
