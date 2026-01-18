import { supabase } from '../db/client';

const templates = [
  {
    template_id: 'math.circle_theorems.angle_in_semicircle.v1',
    title: 'Angle in a Semicircle',
    topic_tags: ['circle-theorems', 'geometry'],
    width: 400,
    height: 400,
    base_svg_data: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <g id="grp:main">
    <!-- Circle -->
    <circle id="ln:circle" cx="200" cy="200" r="150" fill="none" stroke="#1e293b" stroke-width="2"/>

    <!-- Diameter -->
    <line id="ln:AB" x1="50" y1="200" x2="350" y2="200" stroke="#1e293b" stroke-width="2"/>

    <!-- Point C on circumference -->
    <line id="ln:AC" x1="50" y1="200" x2="200" y2="80" stroke="#3b82f6" stroke-width="2"/>
    <line id="ln:BC" x1="350" y1="200" x2="200" y2="80" stroke="#3b82f6" stroke-width="2"/>

    <!-- Points -->
    <circle id="pt:A" cx="50" cy="200" r="5" fill="#1e293b"/>
    <circle id="pt:B" cx="350" cy="200" r="5" fill="#1e293b"/>
    <circle id="pt:C" cx="200" cy="80" r="5" fill="#3b82f6"/>
    <circle id="pt:O" cx="200" cy="200" r="5" fill="#1e293b"/>

    <!-- Labels -->
    <text id="txt:A" x="35" y="205" font-size="18" font-weight="bold" fill="#1e293b">A</text>
    <text id="txt:B" x="360" y="205" font-size="18" font-weight="bold" fill="#1e293b">B</text>
    <text id="txt:C" x="205" y="70" font-size="18" font-weight="bold" fill="#3b82f6">C</text>
    <text id="txt:O" x="205" y="220" font-size="16" fill="#64748b">O</text>

    <!-- Angle mark -->
    <path id="mk:angleC" d="M 185 95 A 20 20 0 0 1 215 95" fill="none" stroke="#ef4444" stroke-width="2"/>
    <text id="txt:angleC" x="193" y="100" font-size="16" fill="#ef4444">90°</text>
  </g>
</svg>`,
    anchors: {
      points: ['pt:A', 'pt:B', 'pt:C', 'pt:O'],
      text: ['txt:A', 'txt:B', 'txt:C', 'txt:O', 'txt:angleC'],
      lines: ['ln:AB', 'ln:AC', 'ln:BC', 'ln:circle'],
      marks: ['mk:angleC']
    },
    schema: {
      labels: {
        A: { default: 'A', maxLen: 2 },
        B: { default: 'B', maxLen: 2 },
        C: { default: 'C', maxLen: 2 },
        O: { default: 'O', maxLen: 2 }
      },
      visibility: {
        'txt:O': { default: true },
        'txt:angleC': { default: true },
        'mk:angleC': { default: true }
      },
      positions: {
        C: { default: { x: 200, y: 80 }, linkedText: 'txt:C' }
      },
      styles: {}
    }
  },
  {
    template_id: 'math.parallel_lines.fzc_angles.v1',
    title: 'F, Z, C Angles (Parallel Lines)',
    topic_tags: ['parallel-lines', 'angles', 'geometry'],
    width: 450,
    height: 350,
    base_svg_data: `<svg viewBox="0 0 450 350" xmlns="http://www.w3.org/2000/svg">
  <g id="grp:main">
    <!-- Parallel lines -->
    <line id="ln:L1" x1="50" y1="100" x2="400" y2="100" stroke="#1e293b" stroke-width="2"/>
    <line id="ln:L2" x1="50" y1="250" x2="400" y2="250" stroke="#1e293b" stroke-width="2"/>

    <!-- Transversal -->
    <line id="ln:T" x1="150" y1="50" x2="300" y2="300" stroke="#3b82f6" stroke-width="2"/>

    <!-- Angle marks -->
    <path id="mk:angle1" d="M 190 100 L 210 100 L 200 85" fill="#ef4444" fill-opacity="0.3"/>
    <path id="mk:angle2" d="M 230 250 L 250 250 L 240 235" fill="#22c55e" fill-opacity="0.3"/>

    <!-- Labels -->
    <text id="txt:L1" x="410" y="105" font-size="16" fill="#1e293b">L₁</text>
    <text id="txt:L2" x="410" y="255" font-size="16" fill="#1e293b">L₂</text>
    <text id="txt:angle1" x="205" y="75" font-size="18" font-weight="bold" fill="#ef4444">a°</text>
    <text id="txt:angle2" x="245" y="225" font-size="18" font-weight="bold" fill="#22c55e">b°</text>

    <!-- Parallel marks -->
    <g id="grp:parallel-marks">
      <line id="mk:par1a" x1="120" y1="95" x2="130" y2="95" stroke="#64748b" stroke-width="2"/>
      <line id="mk:par1b" x1="120" y1="105" x2="130" y2="105" stroke="#64748b" stroke-width="2"/>
      <line id="mk:par2a" x1="120" y1="245" x2="130" y2="245" stroke="#64748b" stroke-width="2"/>
      <line id="mk:par2b" x1="120" y1="255" x2="130" y2="255" stroke="#64748b" stroke-width="2"/>
    </g>
  </g>
</svg>`,
    anchors: {
      points: [],
      text: ['txt:L1', 'txt:L2', 'txt:angle1', 'txt:angle2'],
      lines: ['ln:L1', 'ln:L2', 'ln:T'],
      marks: ['mk:angle1', 'mk:angle2'],
      groups: ['grp:parallel-marks']
    },
    schema: {
      labels: {
        angle1: { default: 'a°', maxLen: 10 },
        angle2: { default: 'b°', maxLen: 10 }
      },
      values: {
        'txt:angle1': { default: 'a°', type: 'string' },
        'txt:angle2': { default: 'b°', type: 'string' }
      },
      visibility: {
        'grp:parallel-marks': { default: true },
        'mk:angle1': { default: true },
        'mk:angle2': { default: true }
      },
      styles: {}
    }
  },
  {
    template_id: 'math.graphs.linear_axes.v1',
    title: 'Linear Graph Axes',
    topic_tags: ['graphs', 'coordinates', 'linear-functions'],
    width: 500,
    height: 500,
    base_svg_data: `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#1e293b"/>
    </marker>
  </defs>
  <g id="grp:main">
    <!-- Grid -->
    <g id="grp:grid" opacity="0.2">
      <line x1="50" y1="100" x2="450" y2="100" stroke="#94a3b8" stroke-width="1"/>
      <line x1="50" y1="150" x2="450" y2="150" stroke="#94a3b8" stroke-width="1"/>
      <line x1="50" y1="200" x2="450" y2="200" stroke="#94a3b8" stroke-width="1"/>
      <line x1="50" y1="250" x2="450" y2="250" stroke="#94a3b8" stroke-width="1"/>
      <line x1="50" y1="300" x2="450" y2="300" stroke="#94a3b8" stroke-width="1"/>
      <line x1="50" y1="350" x2="450" y2="350" stroke="#94a3b8" stroke-width="1"/>
      <line x1="50" y1="400" x2="450" y2="400" stroke="#94a3b8" stroke-width="1"/>
      <line x1="100" y1="50" x2="100" y2="450" stroke="#94a3b8" stroke-width="1"/>
      <line x1="150" y1="50" x2="150" y2="450" stroke="#94a3b8" stroke-width="1"/>
      <line x1="200" y1="50" x2="200" y2="450" stroke="#94a3b8" stroke-width="1"/>
      <line x1="250" y1="50" x2="250" y2="450" stroke="#94a3b8" stroke-width="1"/>
      <line x1="300" y1="50" x2="300" y2="450" stroke="#94a3b8" stroke-width="1"/>
      <line x1="350" y1="50" x2="350" y2="450" stroke="#94a3b8" stroke-width="1"/>
      <line x1="400" y1="50" x2="400" y2="450" stroke="#94a3b8" stroke-width="1"/>
    </g>

    <!-- Axes -->
    <line id="ln:xAxis" x1="50" y1="250" x2="450" y2="250" stroke="#1e293b" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line id="ln:yAxis" x1="250" y1="450" x2="250" y2="50" stroke="#1e293b" stroke-width="2" marker-end="url(#arrowhead)"/>

    <!-- Labels -->
    <text id="txt:xLabel" x="460" y="255" font-size="18" font-weight="bold" fill="#1e293b">x</text>
    <text id="txt:yLabel" x="255" y="40" font-size="18" font-weight="bold" fill="#1e293b">y</text>
    <text id="txt:origin" x="230" y="270" font-size="16" fill="#64748b">0</text>

    <!-- Sample line -->
    <line id="ln:sampleLine" x1="100" y1="350" x2="400" y2="150" stroke="#3b82f6" stroke-width="3" opacity="0"/>

    <!-- Points -->
    <circle id="pt:A" cx="150" cy="300" r="5" fill="#ef4444" opacity="0"/>
    <circle id="pt:B" cx="350" cy="200" r="5" fill="#ef4444" opacity="0"/>

    <text id="txt:A" x="155" y="295" font-size="16" fill="#ef4444" opacity="0">A</text>
    <text id="txt:B" x="355" y="195" font-size="16" fill="#ef4444" opacity="0">B</text>
  </g>
</svg>`,
    anchors: {
      points: ['pt:A', 'pt:B'],
      text: ['txt:xLabel', 'txt:yLabel', 'txt:origin', 'txt:A', 'txt:B'],
      lines: ['ln:xAxis', 'ln:yAxis', 'ln:sampleLine'],
      groups: ['grp:grid']
    },
    schema: {
      labels: {
        xLabel: { default: 'x', maxLen: 10 },
        yLabel: { default: 'y', maxLen: 10 }
      },
      visibility: {
        'grp:grid': { default: true },
        'ln:sampleLine': { default: false },
        'pt:A': { default: false },
        'pt:B': { default: false },
        'txt:A': { default: false },
        'txt:B': { default: false }
      },
      positions: {
        A: { default: { x: 150, y: 300 }, linkedText: 'txt:A' },
        B: { default: { x: 350, y: 200 }, linkedText: 'txt:B' }
      },
      styles: {}
    }
  }
];

export async function seedDiagramTemplates() {
  try {
    // Get Maths subject ID
    const { data: subjects, error: subjectError } = await supabase
      .from('subjects')
      .select('id')
      .eq('name', 'Maths')
      .single();

    if (subjectError) {
      console.error('Error finding Maths subject:', subjectError);
      return { success: false, error: 'Maths subject not found' };
    }

    const mathsSubjectId = subjects.id;

    for (const template of templates) {
      const payload = {
        ...template,
        subject_id: mathsSubjectId
      };

      const { error } = await supabase
        .from('diagram_templates')
        .upsert(payload, { onConflict: 'template_id' });

      if (error) {
        console.error(`Error seeding template ${template.template_id}:`, error);
        return { success: false, error: error.message };
      }
    }

    return { success: true, count: templates.length };
  } catch (error: any) {
    console.error('Error seeding diagram templates:', error);
    return { success: false, error: error.message };
  }
}
