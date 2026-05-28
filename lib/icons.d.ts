/**
 * @stackborg/wp-ui-kits — Centralized Icon Re-exports
 *
 * All plugins import icons from here instead of installing lucide-react directly.
 * This ensures consistent icon versions and reduces per-plugin dependencies.
 *
 * Usage:
 *   import { Cloud, Trash2, Settings } from '@stackborg/wp-ui-kits/icons';
 *
 * When adding a new icon, just add it to the export list below.
 * Run `npx lucide-react list` to see all available icons.
 */
export { LayoutDashboard, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Menu, X, ArrowRight, ArrowLeft, ArrowDownUp, ExternalLink, Plus, Minus, Check, Copy, Download, Upload, Play, RefreshCw, RotateCcw, Search, Settings, Settings2, Wrench, Zap, Power, PowerOff, Database, FolderOpen, Package, Puzzle, Tag, Star, Heart, Globe, Mail, BookOpen, MessageCircle, AlertTriangle, AlertCircle, CheckCircle, XCircle, Info, ShieldCheck, Shield, Loader2, Camera, Cloud, Clock, History, Lock, Unlock, Eye, EyeOff, Target, Trash2, Bomb, Plug, Palette, Key, Server, type LucideIcon, } from 'lucide-react';
